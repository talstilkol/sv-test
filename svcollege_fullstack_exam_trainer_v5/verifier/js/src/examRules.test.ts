import { describe, expect, it } from 'vitest';

function hasReactStateMutation(code: string): boolean {
  return /\.(push|splice|sort)\s*\(/.test(code) && /set[A-Z]/.test(code);
}

function hasAsyncForEach(code: string): boolean {
  return /forEach\s*\(\s*async\s*/.test(code);
}

function hasGetByIdRoute(code: string): boolean {
  return /router\.get\(\s*['"]\/:id['"]/.test(code) && /Book\.findById\(/.test(code);
}

function hasReturnWithoutRoute(uiCode: string, routesCode: string): boolean {
  const hasReturnUi = /return/i.test(uiCode);
  const hasReturnRoute = /router\.(post|put)\(\s*['"]\/return\/:id['"]/.test(routesCode);
  return hasReturnUi && !hasReturnRoute;
}

describe('SVCollege exam anti-pattern detector', () => {
  it('detects likely React state mutation', () => {
    const bad = 'items.push(newItem); setItems(items);';
    expect(hasReactStateMutation(bad)).toBe(true);
  });

  it('detects async forEach', () => {
    const bad = 'users.forEach(async (user) => { await save(user); });';
    expect(hasAsyncForEach(bad)).toBe(true);
  });

  it('requires GET by id route for edit flow', () => {
    const good = "router.get('/:id', async (req, res) => { const book = await Book.findById(req.params.id); res.json(book); });";
    const bad = "router.get('/', async (req, res) => { const books = await Book.find(); res.json(books); });";
    expect(hasGetByIdRoute(good)).toBe(true);
    expect(hasGetByIdRoute(bad)).toBe(false);
  });

  it('detects Return UI without backend return route', () => {
    const ui = '<button>Return</button>';
    const noRoute = "router.post('/borrow/:id', handler);";
    const hasRoute = "router.post('/return/:id', handler);";
    expect(hasReturnWithoutRoute(ui, noRoute)).toBe(true);
    expect(hasReturnWithoutRoute(ui, hasRoute)).toBe(false);
  });
});
