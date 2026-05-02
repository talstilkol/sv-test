# Keyboard Navigation Audit & Completion Plan

> **Task**: P1.2.2  
> **Current Status**: Basic implementation done  
> **Pending**: Comprehensive audit, focus trap, visible indicators  
> **Est. Effort**: 8-12 hours developer work

## Current Implementation (Done)

- ✅ Escape key handling
- ✅ Enter key for MC submission
- ✅ Arrow keys for option navigation
- ✅ tabindex attributes
- ✅ role attributes

## What's Missing

### 1. Comprehensive Audit

#### Checklist per Interactive Element

| Element | Tab Navigation | Enter/Space | Arrow Keys | Focus Visible | ARIA |
|---------|---------------|-------------|------------|---------------|------|
| MC options | ✅ | ✅ | ✅ | ❌ | ❌ |
| Fill inputs | ✅ | ✅ | N/A | ❌ | ❌ |
| Buttons | ✅ | ✅ | N/A | ❌ | ❌ |
| Modal close | ✅ | ✅ | N/A | ❌ | ❌ |
| View tabs | ✅ | ❌ | ❌ | ❌ | ❌ |
| Context tree | ✅ | ❌ | ✅ | ❌ | ❌ |
| Flashcard rating | ✅ | ❌ | ❌ | ❌ | ❌ |
| Exam navigation | ✅ | ❌ | ❌ | ❌ | ❌ |

### 2. Focus Trap in Modals

**Current Problem**: When modal opens, focus can escape to background elements.

**Solution Required**:
```javascript
// Focus trap implementation needed
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  });
}
```

**Modals Requiring Focus Trap**:
1. Help modal
2. Settings modal
3. Quiz results modal
4. Confirm dialogs
5. Bug log modal

### 3. Visible Focus Indicators

**Current Problem**: Focus state is invisible or barely visible.

**Solution Required**:
```css
/* Add to style.css */
:focus-visible {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

button:focus-visible,
[role="button"]:focus-visible {
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.5);
}

/* Don't remove outline for keyboard users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 4. View Tab Navigation

**Current Problem**: Cannot keyboard-navigate between main views.

**Solution Required**:
```javascript
// Add to app.js or navigation module
document.addEventListener('keydown', (e) => {
  // Alt+1 through Alt+9 for main views
  if (e.altKey && e.key >= '1' && e.key <= '9') {
    const viewIndex = parseInt(e.key) - 1;
    const views = ['welcome', 'lessons', 'map', 'trainer', 'guide', ...];
    openView(views[viewIndex]);
  }
});
```

## Implementation Tasks

### Task 1: Focus Indicators (2-3 hours)
- [ ] Add CSS focus-visible styles
- [ ] Test all interactive elements
- [ ] Verify contrast ratios (WCAG 2.1)

### Task 2: Focus Trap (3-4 hours)
- [ ] Implement trapFocus utility
- [ ] Apply to all modals
- [ ] Test with screen reader (NVDA/VoiceOver)

### Task 3: Arrow Key Navigation (2-3 hours)
- [ ] View tabs (left/right)
- [ ] Context tree expand/collapse
- [ ] Flashcard rating buttons
- [ ] Exam navigation grid

### Task 4: Comprehensive Testing (2-3 hours)
- [ ] Keyboard-only navigation test
- [ ] Screen reader compatibility
- [ ] Focus order verification
- [ ] ARIA label audit

## Testing Checklist

```markdown
## Manual Keyboard Test

### Tab Navigation
- [ ] Can reach all interactive elements with Tab
- [ ] Tab order is logical (top-to-bottom, left-to-right)
- [ ] No keyboard traps (except intentional like modals)
- [ ] Skip link provided for main content

### Focus Visibility
- [ ] Focus indicator visible on all elements
- [ ] Sufficient contrast (3:1 minimum)
- [ ] Not obscured by other elements

### Modal Behavior
- [ ] Focus moves to modal when opened
- [ ] Focus trapped within modal
- [ ] Focus returns to trigger when closed

### Arrow Keys
- [ ] Radio groups navigable with arrows
- [ ] Tabs switchable with arrows
- [ ] Tree nodes expandable/collapsible

### Special Keys
- [ ] Enter activates buttons and links
- [ ] Space toggles checkboxes
- [ ] Escape closes modals and menus
```

## WCAG 2.1 Compliance Targets

| Criterion | Level | Status | Action |
|-----------|-------|--------|--------|
| 2.1.1 Keyboard | A | Partial | Complete navigation |
| 2.1.2 No Keyboard Trap | A | Partial | Fix modals |
| 2.1.4 Character Key Shortcuts | A | N/A | None defined |
| 2.4.3 Focus Order | A | Partial | Audit needed |
| 2.4.7 Focus Visible | AA | ❌ | Add CSS |
| 2.5.5 Target Size | AAA | Partial | Review touch targets |

## Developer Tasks

1. **Day 1**: Focus indicators CSS (2h)
2. **Day 1**: Focus trap utility + apply to modals (3h)
3. **Day 2**: Arrow key navigation for tabs/trees (3h)
4. **Day 2**: Testing and fixes (2h)

## Verification

```bash
# Automated testing
npm run test:a11y:keyboard

# Manual testing checklist
npm run test:keyboard:manual

# Screen reader test
npm run test:screenreader
```

---

**This plan provides detailed guidance for completing P1.2.2 keyboard navigation.**
