# Supabase Integration Plan — Production Sync

> **Task**: AUDIT-FIX-27  
> **Current Status**: Core sync logic implemented in `src/core/progress-sync.js`  
> **Pending**: Live Supabase auth, production endpoint, conflict resolution testing  
> **Est. Effort**: 15-25 hours developer work

## Current Implementation

### What's Done ✅
- [x] Payload building (fingerprint, timestamp, data)
- [x] Conflict resolution ("last write wins" strategy)
- [x] Local storage backup
- [x] Normalized URL handling
- [x] Config structure

### Files
- `src/core/progress-sync.js` — Core sync logic
- `src/core/scoring.js` — Score tracking
- `supabase/functions/ai-tutor/` — Edge functions (partial)

## Required Implementation

### 1. Supabase Project Setup (2-3 hours)

**Steps**:
1. Create Supabase project (or use existing)
2. Enable Auth (Email/Password + OAuth providers)
3. Create database tables
4. Setup Row Level Security (RLS)
5. Generate API keys

**Database Schema**:
```sql
-- progress table
CREATE TABLE user_progress (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  fingerprint TEXT NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  version INTEGER DEFAULT 1
);

-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own data
CREATE POLICY "Users access own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);
```

### 2. Authentication Flow (4-6 hours)

**Required Features**:
- Sign up (email/password)
- Sign in
- Sign out
- Password reset
- OAuth (Google, GitHub)

**Implementation**:
```javascript
// src/core/auth.js (new file)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  await supabase.auth.signOut();
}

export function onAuthStateChange(callback) {
  supabase.auth.onAuthStateChange(callback);
}
```

### 3. Progress Sync Endpoint (4-6 hours)

**Edge Function**:
```javascript
// supabase/functions/sync-progress/index.js
import { createClient } from '@supabase/supabase-js';

export default async (req, res) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_ANON_KEY')
  );
  
  const { user } = await supabase.auth.getUser(req.headers.authorization);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  
  const { fingerprint, data, timestamp, version } = await req.json();
  
  // Get current server state
  const { data: existing } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single();
  
  // Conflict resolution: last write wins
  if (existing && existing.updated_at > timestamp) {
    return res.json({
      status: 'conflict',
      serverData: existing.data,
      serverTimestamp: existing.updated_at,
      message: 'Server has newer data'
    });
  }
  
  // Save progress
  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      fingerprint,
      data,
      updated_at: new Date(timestamp).toISOString(),
      version: version || 1
    });
  
  if (error) return res.status(500).json({ error: error.message });
  
  return res.json({ status: 'success' });
};
```

### 4. Client-Side Integration (4-6 hours)

**Update `progress-sync.js`**:
```javascript
import { supabase } from './auth.js';

export async function syncToCloud(localProgress) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) return { status: 'not-authenticated' };
  
  const payload = buildPayload(localProgress); // Existing function
  
  const { data, error } = await supabase.functions.invoke('sync-progress', {
    body: payload
  });
  
  if (error) {
    console.error('Sync failed:', error);
    return { status: 'error', error };
  }
  
  if (data.status === 'conflict') {
    return resolveConflict(localProgress, data.serverData);
  }
  
  return { status: 'success' };
}

async function resolveConflict(localData, serverData) {
  // Strategy: merge, keeping highest level per concept
  const merged = {};
  
  for (const conceptKey in { ...localData, ...serverData }) {
    const local = localData[conceptKey];
    const server = serverData[conceptKey];
    
    if (!local) merged[conceptKey] = server;
    else if (!server) merged[conceptKey] = local;
    else {
      // Keep highest level, sum attempts
      merged[conceptKey] = {
        level: Math.max(local.level, server.level),
        attempts: (local.attempts || 0) + (server.attempts || 0),
        correct: (local.correct || 0) + (server.correct || 0),
        // ... other fields
      };
    }
  }
  
  return { status: 'merged', data: merged };
}
```

### 5. UI Components (2-3 hours)

**Auth Modal**:
```javascript
// src/components/AuthModal.js
export function renderAuthModal() {
  return `
    <div class="auth-modal">
      <h2>התחבר כדי לשמור התקדמות בענן</h2>
      <form id="auth-form">
        <input type="email" placeholder="אימייל" required />
        <input type="password" placeholder="סיסמה" required />
        <button type="submit">התחבר</button>
      </form>
      <button id="auth-close">סגור</button>
    </div>
  `;
}
```

**Sync Status Indicator**:
```javascript
// Show sync status in header
function renderSyncStatus() {
  const session = supabase.auth.getSession();
  if (!session) return '<span class="sync-status offline">אופליין</span>';
  
  return '<span class="sync-status online">מסונכרן</span>';
}
```

## Environment Configuration

```bash
# .env (local development)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Security Considerations

1. **Row Level Security (RLS)**: ✅ Users only access own data
2. **Input Validation**: Sanitize all progress data before storage
3. **Rate Limiting**: Max 1 sync per minute per user
4. **Data Encryption**: Use SSL (enforced by Supabase)
5. **Backup**: Enable Supabase point-in-time recovery

## Testing Plan

### Unit Tests
```javascript
// tests/progress-sync.test.js
test('sync with no conflict', async () => {
  const local = { 'lesson1::concept': { level: 3 } };
  const result = await syncToCloud(local);
  expect(result.status).toBe('success');
});

test('sync with conflict merges data', async () => {
  const local = { 'lesson1::concept': { level: 3 } };
  const server = { 'lesson1::concept': { level: 5 } };
  const result = await resolveConflict(local, server);
  expect(result.data['lesson1::concept'].level).toBe(5);
});
```

### Integration Tests
1. Sign up → sync progress → verify in DB
2. Two devices → sync both → verify merge
3. Offline → online → sync queued

## Implementation Schedule

| Day | Task | Hours |
|-----|------|-------|
| 1 | Supabase project setup, schema | 3h |
| 1 | Auth flow (sign up/in/out) | 4h |
| 2 | Edge function (sync endpoint) | 5h |
| 2 | Client integration, conflict resolution | 4h |
| 3 | UI components, testing | 4h |
| 3 | Deployment, verification | 3h |

**Total: 23 hours**

## Verification Commands

```bash
# Test sync
npm run test:sync

# Test auth
npm run test:auth

# Full integration
npm run test:integration:sync

# Production check
npm run sync:production:verify
```

## Post-Implementation Checklist

- [ ] Users can sign up/in/out
- [ ] Progress syncs automatically
- [ ] Conflict resolution works correctly
- [ ] Offline mode works, syncs when online
- [ ] RLS policies prevent unauthorized access
- [ ] Rate limiting in place
- [ ] Error handling user-friendly
- [ ] Sync status visible in UI

---

**This plan provides detailed guidance for implementing AUDIT-FIX-27 Supabase integration.**
