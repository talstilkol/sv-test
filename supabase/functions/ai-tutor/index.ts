// supabase/functions/ai-tutor/index.ts
// Deploy: supabase functions deploy ai-tutor
// Requires env vars: ANTHROPIC_API_KEY
// Optional env vars: ANTHROPIC_MODEL, AI_TUTOR_RATE_LIMIT

import Anthropic from "npm:@anthropic-ai/sdk@0.27.0";

const ALLOWED_MODES = new Set(["coach", "explain", "check"]);
const DEFAULT_MODEL = "claude-3-haiku-20240307";
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = Math.max(1, Number(Deno.env.get("AI_TUTOR_RATE_LIMIT") || "12"));
const rateBuckets = new Map<string, { windowStart: number; count: number }>();

const SYSTEM_PROMPT = `אתה מאמן לימוד ידידותי למפתחים ישראלים שלומדים SVCollege AI & Full Stack.
עונה תמיד בעברית. תגובות קצרות ומדויקות (עד 150 מילים).
שלושה מצבים:
- coach: מנחה, שואל שאלות, עוזר לפרק בעיות
- explain: מסביר מושג ספציפי בצורה ברורה עם דוגמה
- check: בדיקת הבנה — שואל שאלה קצרה ומאמת תשובה
כללי בטיחות:
- אין לתת תשובה מלאה למבחן או פתרון copy-paste כאשר המשתמש מבקש לעקוף למידה.
- קודם נותנים רמז, שאלה מנחה, או דוגמה מינימלית.
- אם חסר הקשר, אומרים unknown/unavailable ולא ממציאים פרטי קורס, ציונים או נתוני תלמיד.
- אין לבקש סיסמאות, מפתחות API או מידע אישי.`;

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function safeText(value: unknown, max = 1200) {
  return String(value ?? "").trim().slice(0, max);
}

function clientKey(req: Request) {
  const auth = req.headers.get("Authorization") || "";
  const forwarded = req.headers.get("x-forwarded-for") || "";
  return safeText(auth || forwarded || "anonymous", 240);
}

function rateLimitStatus(key: string, now = Date.now()) {
  const current = rateBuckets.get(key);
  if (!current || now - current.windowStart >= RATE_WINDOW_MS) {
    rateBuckets.set(key, { windowStart: now, count: 1 });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }
  if (current.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  current.count += 1;
  return { allowed: true, remaining: RATE_LIMIT - current.count };
}

function looksLikeBypassRequest(message: string) {
  return /(?:תן לי את התשובה|רק תשובה|בלי הסבר|copy[- ]?paste|פתור לי את המבחן|answer only)/i.test(message);
}

function modeInstruction(mode: string) {
  if (mode === "explain") return "מצב: הסבר — הסבר בקצרה עם דוגמה קוד מינימלית אם רלוונטי.";
  if (mode === "check") return "מצב: בדיקה — שאל שאלת בדיקה קצרה או אמת תשובת המשתמש בלי לחשוף פתרון מלא.";
  return "מצב: מאמן — הנחה את המשתמש להגיע לתשובה בעצמו.";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const body = await req.json().catch(() => ({}));
  const message = safeText(body.message, 1200);
  const requestedMode = safeText(body.mode, 40);
  const mode = ALLOWED_MODES.has(requestedMode) ? requestedMode : "coach";
  const concept = safeText(body.concept, 180);
  const lessonId = safeText(body.lessonId, 120);
  const key = clientKey(req);
  const rate = rateLimitStatus(key);

  if (!message) return jsonResponse({ error: "empty message" }, 400);
  if (!rate.allowed) {
    console.warn(JSON.stringify({
      event: "ai_tutor_rate_limited",
      mode,
      concept,
      lessonId,
      limit: RATE_LIMIT,
    }));
    return jsonResponse({ error: "rate limit exceeded", retryAfterSeconds: 60 }, 429);
  }
  if (looksLikeBypassRequest(message)) {
    console.info(JSON.stringify({
      event: "ai_tutor_guardrail_blocked",
      mode,
      concept,
      lessonId,
    }));
    return jsonResponse({
      reply: "אני לא אתן פתרון מלא להעתקה. נתקדם נכון: כתוב מה כבר ניסית, ואני אתן רמז קצר ושאלת בדיקה שתוביל אותך לתשובה.",
      guardrail: "answer-leak-prevention",
    });
  }

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return jsonResponse({ error: "AI tutor is not configured" }, 503);

  const anthropic = new Anthropic({ apiKey });
  const model = safeText(Deno.env.get("ANTHROPIC_MODEL") || DEFAULT_MODEL, 120);
  const contextLine = [
    concept ? `מושג נוכחי: ${concept}` : "",
    lessonId ? `שיעור נוכחי: ${lessonId}` : "",
  ].filter(Boolean).join("\n");

  const msg = await anthropic.messages.create({
    model,
    max_tokens: 400,
    system: [SYSTEM_PROMPT, contextLine, modeInstruction(mode)].filter(Boolean).join("\n"),
    messages: [{ role: "user", content: message }],
  });

  const reply = msg.content[0]?.type === "text" ? msg.content[0].text : "";
  console.info(JSON.stringify({
    event: "ai_tutor_response",
    mode,
    concept,
    lessonId,
    model,
    remaining: rate.remaining,
    replyLength: reply.length,
  }));

  return jsonResponse({ reply, mode, guardrail: "socratic-first", remaining: rate.remaining });
});
