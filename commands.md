# 🎭 Playwright CLI Cheatsheet

### Run Tests
- Run all tests  
  ```bash
  npx playwright test
  ```
- Run tests in a specific file  
  ```bash
  npx playwright test tests/example.spec.ts
  ```
- Run a specific test by title  
  ```bash
  npx playwright test -g "should display homepage"
  ```

### Browsers
- Run in a specific browser  
  ```bash
  npx playwright test --project=chromium
  npx playwright test --project=firefox
  npx playwright test --project=webkit
  ```
- Run all projects defined in `playwright.config.ts`  
  ```bash
  npx playwright test
  ```

### Debugging
- Debug mode with inspector  
  ```bash
  npx playwright test --debug
  ```
- Run in headed mode (see the browser window)  
  ```bash
  npx playwright test --headed
  ```
- Slow down actions for visibility  
  ```bash
  npx playwright test --slow-mo 1000
  ```

### Filtering & Control
- Only run tests that failed in the last run  
  ```bash
  npx playwright test --last-failed
  ```
- Repeat tests  
  ```bash
  npx playwright test --repeat-each 3
  ```
- Shard test suite (parallelization across CI jobs)  
  ```bash
  npx playwright test --shard=1/3
  ```

### Reports
- Generate HTML report  
  ```bash
  npx playwright show-report
  ```
- Change report format (configured in `playwright.config.ts`)  
  ```bash
  npx playwright test --reporter=html
  ```

### Screenshots, Videos, Traces
- Open saved trace  
  ```bash
  npx playwright show-trace trace.zip
  ```
- Enable trace recording in config:  
  ```ts
  use: { trace: 'on-first-retry' }
  ```

### Code Generation & Browsing
- Generate tests interactively  
  ```bash
  npx playwright codegen https://example.com
  ```
- Launch browser for debugging scripts  
  ```bash
  npx playwright open https://example.com
  ```

### Install / Update
- Install supported browsers  
  ```bash
  npx playwright install
  ```
- Install only Chromium (or another browser)  
  ```bash
  npx playwright install chromium
  ```

---

✅ **Tip:**  
For quick help, run:  
```bash
npx playwright --help
```