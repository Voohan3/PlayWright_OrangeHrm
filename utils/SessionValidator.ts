import { Browser } from "@playwright/test";

export class SessionValidator {
  async validate(browser: Browser, storageState: string): Promise<boolean> {
    const context = await browser.newContext({
      storageState,
    });

    const page = await context.newPage();

    try {
      await page.goto(`${process.env.BASE_URL}/web/index.php/dashboard/index`, {
        waitUntil: "domcontentloaded",
      });

      // If redirected to login, session is invalid
      if (page.url().includes("/auth/login")) {
        return false;
      }

      // Verify Dashboard is displayed
      await page
        .getByRole("heading", {
          name: "Dashboard",
        })
        .waitFor({
          state: "visible",
          timeout: 5000,
        });

      return true;
    } catch (error) {
      return false;
    } finally {
      await context.close();
    }
  }
}
