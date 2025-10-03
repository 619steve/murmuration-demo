````md
# 🕹️ Murmuration Demo Tests

End-to-end tests powered by [Playwright](https://playwright.dev).  
Follow these steps to get up and running 🚀

---

## ✅ System Requirements

- Node.js: latest 20.x, 22.x or 24.x
- Windows 10+, macOS 14+, or recent Ubuntu/Debian
- Git installed

---

## 🛠️ Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/619steve/murmuration-demo.git
   cd murmuration-demo
````

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Run tests**

   ```sh
   npx playwright test
   ```

---

## 🔑 Authentication Setup

Logging in before every test would be slow ⏳.  
Instead, this project uses a special **setup project** (`*.setup.ts`) to log in once and save authentication state.  

If you see tests failing because of login, just re-run setup:

```sh
npx playwright test --project=setup
```

Your session is stored in `playwright/.auth/user.json` and reused by other tests.

---

## 🐛 Debugging & Useful Commands

* Run in headed mode (see browser window):

  ```sh
  npx playwright test --headed
  ```

* Debug mode (step through tests interactively):

  ```sh
  npx playwright test --debug
  ```

For more commands, check out 👉 [commands.md](commands.md)

---

```
```