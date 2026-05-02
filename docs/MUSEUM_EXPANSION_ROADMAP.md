# Museum Expansion Roadmap

> **Status**: Planned (Post Finish Line 1)  
> **Date**: 2026-05-01  
> **Trigger**: `finish-line:pre-release` shows 18/18 PASS  
> **Owner**: Kimi 2.6 (as noted)  
> **Constraint**: לא לבצע לפני Finish Line 1 אלא אם יש חסימה ישירה להכנה למבחן

## Museum Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     LUMEN MUSEUM                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ENTRANCE HALL (MUSEUM-FWD-1.x)                              │
│  ├── Interactive map (MUSEUM-FWD-1.1)                       │
│  ├── Entry fees (XP/Coins) (MUSEUM-FWD-1.2)                 │
│  ├── Recommended paths (MUSEUM-FWD-1.3)                     │
│  ├── Progress dashboard (MUSEUM-FWD-1.4)                      │
│  ├── Search (MUSEUM-FWD-1.5)                                │
│  └── Deterministic tips (MUSEUM-FWD-1.6)                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  WING 1: Computer Architecture (MUSEUM-FWD-2.x)            │
│  ├── Switch simulator (MUSEUM-FWD-2.1)                      │
│  ├── Logic gates (MUSEUM-FWD-2.2)                           │
│  ├── Binary converters (MUSEUM-FWD-2.3)                     │
│  ├── Type interpretation (MUSEUM-FWD-2.4)                   │
│  ├── Machine code X-Ray (MUSEUM-FWD-2.5)                      │
│  ├── Code execution diagram (MUSEUM-FWD-2.6)                  │
│  ├── Cost/Trade-off room (MUSEUM-FWD-2.7)                     │
│  └── Visual comparisons (MUSEUM-FWD-2.8)                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  WING 2: Languages (MUSEUM-FWD-3.x)                          │
│  ├── Language cards (MUSEUM-FWD-3.1)                          │
│  ├── Problem/solution/trade-offs (MUSEUM-FWD-3.2)           │
│  ├── Trade-offs room (MUSEUM-FWD-3.3)                        │
│  ├── Direct comparisons (MUSEUM-FWD-3.4)                    │
│  └── Language → Product path (MUSEUM-FWD-3.5)                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  WING 3: Full-Stack (MUSEUM-FWD-4.x)                         │
│  ├── UI/HTML/CSS (MUSEUM-FWD-4.1)                           │
│  ├── Browser Runtime (MUSEUM-FWD-4.2)                         │
│  ├── Async/Network (MUSEUM-FWD-4.3)                          │
│  ├── Node/npm/modules (MUSEUM-FWD-4.4)                       │
│  ├── API/HTTP/Express (MUSEUM-FWD-4.5)                         │
│  ├── Database/Mongo (MUSEUM-FWD-4.6)                         │
│  ├── React Product (MUSEUM-FWD-4.7)                           │
│  ├── Quality/Tests/AI Review (MUSEUM-FWD-4.8)                 │
│  └── Input → Process → Output diagrams (MUSEUM-FWD-4.9)      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  WING 4: Product Management (MUSEUM-FWD-5.x)                 │
│  ├── Pre-dev templates (MUSEUM-FWD-5.1)                      │
│  ├── During-dev templates (MUSEUM-FWD-5.2)                   │
│  ├── Pre-launch checklists (MUSEUM-FWD-5.3)                  │
│  ├── Rollout & monitoring (MUSEUM-FWD-5.4)                 │
│  ├── Post-launch process (MUSEUM-FWD-5.5)                    │
│  └── Product simulator (MUSEUM-FWD-5.6)                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  WING 5: Error Hall (MUSEUM-FWD-6.x)                         │
│  ├── Error identification (MUSEUM-FWD-6.1)                   │
│  ├── Root Cause Simulator (MUSEUM-FWD-6.2)                 │
│  └── Lesson/Concept links (MUSEUM-FWD-6.3)                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  WING 6: Contracts & Data (MUSEUM-FWD-7.x)                   │
│  ├── Contract definitions (MUSEUM-FWD-7.1)                 │
│  ├── Ownership matrix (MUSEUM-FWD-7.2)                       │
│  ├── Data flow path (MUSEUM-FWD-7.3)                         │
│  └── Contract Breaker (MUSEUM-FWD-7.4)                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Core Principles (MUSEUM-FWD-0.x)

### 0.1 Source of Truth
- Museum data **outside** `app.js`
- Dedicated schema for wings, rooms, exhibits
- XP/Coin prices in data, not code
- Video, passport, knowledge check all data-driven

### 0.2 Historical Claims Gate
```javascript
// Gate: No historical/technical claims without source
function validateExhibit(exhibit) {
  if (exhibit.claims.some(c => c.type === 'historical' && !c.source)) {
    return { valid: false, reason: 'Historical claim without source' };
  }
  if (exhibit.status === 'unknown/unavailable') {
    return { valid: false, reason: 'Unknown status cannot be published' };
  }
  return { valid: true };
}
```

### 0.3 No Randomness
- Deterministic progression only
- `deterministicNextTip()` not `randomTip()`
- Tips based on user state, not RNG

### 0.4 UI Non-Interference
- Museum does **not** add chrome to lesson screens
- Does **not** reduce SVCollege content space
- Standalone experience

### 0.5 Economy Rules
| Rule | Enforcement |
|------|-------------|
| XP/Coins = learning rewards | Only |
| Not real money | No exchange |
| Not grade shortcuts | Separate systems |
| Don't replace mastery | Complementary |

## Implementation Phases

### Phase 0: Foundation (Weeks 1-2)
- [ ] MUSEUM-FWD-0.1: Schema design
- [ ] MUSEUM-FWD-0.2: Historical claims gate
- [ ] MUSEUM-FWD-0.3: Randomness ban gate
- [ ] MUSEUM-FWD-0.4: UI isolation
- [ ] MUSEUM-FWD-0.5: Economy policy enforcement

### Phase 1: Entrance (Weeks 3-4)
- [ ] MUSEUM-FWD-1.1: Interactive map
- [ ] MUSEUM-FWD-1.2: Entry fees system
- [ ] MUSEUM-FWD-1.3: Recommended paths
- [ ] MUSEUM-FWD-1.4: Progress dashboard
- [ ] MUSEUM-FWD-1.5: Search
- [ ] MUSEUM-FWD-1.6: Deterministic tips

### Phase 2: Computer Architecture (Weeks 5-8)
- [ ] MUSEUM-FWD-2.1: Switch simulator
- [ ] MUSEUM-FWD-2.2: Logic gates
- [ ] MUSEUM-FWD-2.3: Binary converters
- [ ] MUSEUM-FWD-2.4: Type interpretation
- [ ] MUSEUM-FWD-2.5: Machine code X-Ray
- [ ] MUSEUM-FWD-2.6: Code execution diagram
- [ ] MUSEUM-FWD-2.7: Cost/Trade-off room
- [ ] MUSEUM-FWD-2.8: Visual comparisons

### Phase 3: Languages (Weeks 9-12)
- [ ] MUSEUM-FWD-3.1: Language cards (12 languages)
- [ ] MUSEUM-FWD-3.2: Problem/solution cards
- [ ] MUSEUM-FWD-3.3: Trade-offs room
- [ ] MUSEUM-FWD-3.4: Direct comparisons
- [ ] MUSEUM-FWD-3.5: Language → Product path

### Phase 4: Full-Stack (Weeks 13-20)
- [ ] MUSEUM-FWD-4.1: UI/HTML/CSS
- [ ] MUSEUM-FWD-4.2: Browser Runtime
- [ ] MUSEUM-FWD-4.3: Async/Network
- [ ] MUSEUM-FWD-4.4: Node/npm/modules
- [ ] MUSEUM-FWD-4.5: API/HTTP/Express
- [ ] MUSEUM-FWD-4.6: Database/Mongo
- [ ] MUSEUM-FWD-4.7: React Product
- [ ] MUSEUM-FWD-4.8: Quality/Tests
- [ ] MUSEUM-FWD-4.9: Data flow diagrams

### Phase 5: Product Management (Weeks 21-24)
- [ ] MUSEUM-FWD-5.1: Pre-dev templates
- [ ] MUSEUM-FWD-5.2: During-dev templates
- [ ] MUSEUM-FWD-5.3: Pre-launch checklists
- [ ] MUSEUM-FWD-5.4: Rollout & monitoring
- [ ] MUSEUM-FWD-5.5: Post-launch process
- [ ] MUSEUM-FWD-5.6: Product simulator

### Phase 6: Error Hall (Weeks 25-28)
- [ ] MUSEUM-FWD-6.1: Error identification
- [ ] MUSEUM-FWD-6.2: Root Cause Simulator
- [ ] MUSEUM-FWD-6.3: Lesson links

### Phase 7: Contracts & Data (Weeks 29-32)
- [ ] MUSEUM-FWD-7.1: Contract definitions
- [ ] MUSEUM-FWD-7.2: Ownership matrix
- [ ] MUSEUM-FWD-7.3: Data flow path
- [ ] MUSEUM-FWD-7.4: Contract Breaker

## Data Schema

```typescript
interface Museum {
  entrance: Entrance;
  wings: Wing[];
}

interface Wing {
  id: string;
  name: string;
  description: string;
  icon: string;
  entryFee: XPAmount;
  rooms: Room[];
  status: 'locked' | 'unlocked' | 'visited';
  unlockRequirements: UnlockRequirement[];
}

interface Room {
  id: string;
  name: string;
  exhibits: Exhibit[];
  status: 'locked' | 'unlocked' | 'completed';
}

interface Exhibit {
  id: string;
  type: 'simulator' | 'card' | 'diagram' | 'interactive';
  title: string;
  content: Content;
  knowledgeCheck?: Question[];
  source: Source[];  // Required for all claims
}

interface Source {
  type: 'historical' | 'technical' | 'lesson';
  reference: string;
  verified: boolean;
}
```

## Verification Gates

| Gate | Check |
|------|-------|
| No historical without source | ✅ |
| No random functions | ✅ |
| XP economy rules | ✅ |
| UI isolation | ✅ |
| Lesson links valid | ✅ |

## Dependencies

- ✅ Finish Line 1 complete
- ✅ Economy system stable
- ✅ XP/Coin system working
- ⏸️ Content authoring (per wing)
- ⏸️ Simulator development

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Scope creep | Strict Finish Line 1 prerequisite |
| Content quality | Source verification gates |
| UI conflicts | Isolation testing |
| Economy abuse | Strict policy enforcement |

## Commands

```bash
# Validate museum data
npm run museum:validate

# Check historical sources
npm run museum:source-check

# Test economy rules
npm run museum:economy:test

# Build museum content
npm run museum:build
```

## Success Criteria

Museum launch when:
- ✅ Entrance complete (1.x)
- ✅ ≥2 wings complete with full content
- ✅ All gates passing
- ✅ No UI regressions
- ✅ Economy balanced
