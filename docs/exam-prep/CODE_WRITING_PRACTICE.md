# תרגילי כתיבת קוד למבחן SVCollege

> תרגילים לכתוב קוד מהזיכרון. בלי auto-complete, בלי IDE.
> בדוק עצמך — אם לא הצלחת, חזור על השיעור הרלוונטי.

---

## חלק א' — JavaScript Foundations

### תרגיל 1: Closure
**משימה:** כתוב פונקציה `makeCounter()` שמחזירה פונקציה. כל קריאה מחזירה את המספר הבא (מתחיל מ-1).

```javascript
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

<details>
<summary>פתרון</summary>

```javascript
function makeCounter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  };
}
```
</details>

---

### תרגיל 2: Array map/filter/reduce
**משימה:** קבל רשימת מוצרים `[{name, price, available}]`. החזר סכום של המוצרים הזמינים.

<details>
<summary>פתרון</summary>

```javascript
function totalAvailable(products) {
  return products
    .filter(p => p.available)
    .reduce((sum, p) => sum + p.price, 0);
}
```
</details>

---

### תרגיל 3: async/await + try/catch
**משימה:** כתוב פונקציה `fetchUser(id)` שעושה fetch ל-`/api/users/${id}` ומחזירה את הנתונים. במקרה של שגיאה — מחזירה `null`.

<details>
<summary>פתרון</summary>

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    return null;
  }
}
```
</details>

---

### תרגיל 4: Object spread + destructuring
**משימה:** קבל אובייקט `user`, וכתוב פונקציה שמחזירה עותק עם property `lastUpdated` שווה לתאריך עכשווי.

<details>
<summary>פתרון</summary>

```javascript
function withTimestamp(user) {
  return { ...user, lastUpdated: new Date().toISOString() };
}
```
</details>

---

## חלק ב' — DOM Manipulation

### תרגיל 5: Event Delegation
**משימה:** ב-`<ul id="todos">` יש items של `<li>` עם class `done`. כתוב listener שכשלוחצים על `<li>` — הוא מתחלף.

<details>
<summary>פתרון</summary>

```javascript
document.getElementById('todos').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('done');
  }
});
```
</details>

---

### תרגיל 6: Form Validation
**משימה:** בtoken `<form id="login">` עם שדות email + password. כתוב listener שמונע submit אם email ריק או password קצר מ-8.

<details>
<summary>פתרון</summary>

```javascript
document.getElementById('login').addEventListener('submit', (e) => {
  const email = e.target.email.value;
  const password = e.target.password.value;
  if (!email || password.length < 8) {
    e.preventDefault();
    alert('Invalid input');
  }
});
```
</details>

---

## חלק ג' — React Components

### תרגיל 7: useState Counter
**משימה:** כתוב רכיב Counter שמציג מספר ושני כפתורים: + ו--.

<details>
<summary>פתרון</summary>

```jsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```
</details>

---

### תרגיל 8: useEffect + Fetch
**משימה:** רכיב `UserProfile` שמקבל `userId`, מ-fetch מ-`/api/users/${userId}` בעת mount, ומציג שם.

<details>
<summary>פתרון</summary>

```jsx
import { useEffect, useState } from 'react';

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => { if (!cancelled) setUser(data); });
    return () => { cancelled = true; };
  }, [userId]);

  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```
</details>

---

### תרגיל 9: useContext
**משימה:** צור `ThemeContext` עם value `'light'` או `'dark'`, ורכיב `Page` שצורך אותו ומציג רקע מתאים.

<details>
<summary>פתרון</summary>

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function Page() {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ background: theme === 'dark' ? '#000' : '#fff' }}>
      Hello
    </div>
  );
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}
```
</details>

---

## חלק ד' — Backend (Node + Express)

### תרגיל 10: Express GET endpoint
**משימה:** Express server עם endpoint `/api/health` שמחזיר `{ ok: true }`.

<details>
<summary>פתרון</summary>

```javascript
const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(3000);
```
</details>

---

### תרגיל 11: POST + body validation
**משימה:** Endpoint `/api/users` שמקבל body עם `name` ו-`email`. אם חסר — 400. אחרת — מחזיר את המשתמש.

<details>
<summary>פתרון</summary>

```javascript
app.use(express.json());

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  res.json({ name, email, id: Math.floor(Math.random() * 1000) });
});
```
</details>

---

### תרגיל 12: Auth Middleware
**משימה:** middleware `requireAuth` שבודק header `Authorization` — אם אין → 401.

<details>
<summary>פתרון</summary>

```javascript
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/api/profile', requireAuth, (req, res) => {
  res.json({ profile: 'data' });
});
```
</details>

---

## חלק ה' — Database (SQL)

### תרגיל 13: SELECT with JOIN
**משימה:** טבלאות `users(id, name)` ו-`orders(id, user_id, amount)`. SQL שמחזיר שם משתמש + סך כל ההזמנות שלו.

<details>
<summary>פתרון</summary>

```sql
SELECT
  users.name,
  SUM(orders.amount) AS total
FROM users
LEFT JOIN orders ON orders.user_id = users.id
GROUP BY users.id, users.name;
```
</details>

---

### תרגיל 14: INSERT עם constraint
**משימה:** SQL שיוצר טבלה `posts` עם title שלא יכול להיות null, וisert post.

<details>
<summary>פתרון</summary>

```sql
CREATE TABLE posts (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  body text
);

INSERT INTO posts (title, body) VALUES ('Hello', 'World');
```
</details>

---

## חלק ו' — TypeScript

### תרגיל 15: Interface
**משימה:** הגדר interface `User` עם id (number), name (string), email (string, optional). כתוב פונקציה `formatUser(u: User): string`.

<details>
<summary>פתרון</summary>

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

function formatUser(u: User): string {
  return u.email ? `${u.name} <${u.email}>` : u.name;
}
```
</details>

---

### תרגיל 16: Generic
**משימה:** פונקציה `first<T>` שמקבלת מערך ומחזירה את האיבר הראשון או undefined אם המערך ריק.

<details>
<summary>פתרון</summary>

```typescript
function first<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}
```
</details>

---

## חלק ז' — Testing

### תרגיל 17: Jest unit test
**משימה:** test לפונקציה `add(a, b)` — בודק שמחזירה סכום.

<details>
<summary>פתרון</summary>

```javascript
function add(a, b) {
  return a + b;
}

test('add returns sum', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});
```
</details>

---

### תרגיל 18: React Testing Library
**משימה:** test ל-Counter component שלוחץ על + ובודק שהמספר עלה.

<details>
<summary>פתרון</summary>

```jsx
import { render, screen, fireEvent } from '@testing-library/react';

test('Counter increments', () => {
  render(<Counter />);
  fireEvent.click(screen.getByText('+'));
  expect(screen.getByText('1')).toBeInTheDocument();
});
```
</details>

---

## איך להשתמש בתרגילים האלה

1. **לסגור את העיניים** או לכסות את הפתרון
2. **לכתוב את הקוד בעט/ניר** — או במחשב בלי auto-complete
3. **רק אז להסתכל** על הפתרון
4. **לבדוק:** פיספסת syntax? שכחת import? לא טיפלת ב-error case?
5. **לחזור על שיעור** אם משהו לא ברור

**כלל:** אל תזיז עין מהפתרון לפני שכתבת לבד. זה הבדל בין "אני יודע" ל-"אני יכול".

---

**תאריך:** 2026-05-02
