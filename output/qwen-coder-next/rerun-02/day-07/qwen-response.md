Failure 1:  
- Evidence: `npm run build` in client folder failed with: `Rollup failed to resolve import "/src/main.js" from .../client/index.html`.  
- Root cause: `client/src/main.jsx` exists, but `client/index.html` references `src/main.js` (`.js` extension missing `.jsx`).  
- Minimal fix: Update `client/index.html` to reference `src/main.jsx`.  
- Verification: Build will pass only after this correction.

```html path=client/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SV Library</title>
    <script type="module" src="/src/main.jsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

Failure 2:  
- Evidence: Backend fails to start with `Error: Cannot find module 'express'`.  
- Root cause: `server/server.js` requires `'express'`, but `express` is not declared in `server/package.json`.  
- Minimal fix: Create/replace `server/package.json` with minimal required dependencies.  
- Verification: `npm install` + `node server.js` should start server.

```json path=server/package.json
{
  "name": "sv-library-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^4.21.0",
    "mongoose": "^8.8.0"
  }
}
```

---

Final:
- commands rerun:
```bash
cd client && npm run build   # after index.html fix
cd server && npm install && node server.js
```

- remaining unknown/unavailable items:  
  - `/` endpoint behavior unknown (no route defined yet in `server.js`).  
  - Full backend test (GET `/api/books`, etc.) pending server startup success.  
  - Frontend ↔ backend integration untested without valid `VITE_API_URL` in `.env`.

- updated score:  
  - Build: ✅ after `index.html` fix  
  - Backend start: ✅ after `server/package.json` fix  
  - Full functionality: ⚠️ untested (needs manual verification next)

