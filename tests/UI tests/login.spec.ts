import { test } from "../../fixtures/BaseFixture";

// The chromium project supplies an authenticated storage state for application
// tests. Login tests must instead start with an explicitly empty context.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login Module", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/web/index.php/auth/login");
    await page.waitForLoadState("load");
  });

  test("Valid Login", async ({ loginPage, dashboardPage }) => {
    await loginPage.loginAsAdmin();

    await dashboardPage.verifyDashboard();
  });
});
