// supabase/functions/ai-tutor/index.ts
// Deploy: supabase functions deploy ai-tutor
// Requires env vars: ANTHROPIC_API_KEY

import Anthropic from "npm:@anthropic-ai/sdk@0.27.0";

const SYSTEM_PROMPT = `אתה מאמן לימוד ידידותי למפתחים ישראלים לומדים React ו-JavaScript.
עונה תמיד בעברית. תגובות קצרות ומדויקות (עד 150 מילים).
שלושה מצבים:
- coach: מנחה, שואל שאלות, עוזר לפרק בעיות
- explain: מסביר מושג ספציפי בצורה ברורה עם דוגמה
- check: בדיקת הבנה — שואל שאלה קצרה ומאמת תשובה`;

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
  const { message = "", mode = "coach", concept = "" } = body;

  if (!message.trim()) return new Response(JSON.stringify({ error: "empty message" }), { status: 400 });

  const anthropic = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY") });

  const contextLine = concept ? `\nמושג נוכחי: ${concept}` : "";
  const modeInstruction =
    mode === "explain" ? "מצב: הסבר — הסבר בקצרה עם דוגמה קוד אם רלוונטי." :
    mode === "check"   ? "מצב: בדיקה — שאל שאלת בדיקה קצרה או אמת תשובת המשתמש." :
                         "מצב: מאמן — הנחה את המשתמש להגיע לתשובה בעצמו.";

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    system: SYSTEM_PROMPT + contextLine + "\n" + modeInstruction,
    messages: [{ role: "user", content: message }],
  });

  const reply = msg.content[0]?.type === "text" ? msg.content[0].text : "";

  return new Response(JSON.stringify({ reply }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
