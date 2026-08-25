import { Locator, Page } from "@playwright/test";

export class WaitUtil {
  static async waitForVisible(locator: Locator) {
    await locator.waitFor({
      state: "visible",
    });
  }

  static async waitForHidden(locator: Locator) {
    await locator.waitFor({
      state: "hidden",
    });
  }

  static async waitForNetwork(page: Page) {
    await page.waitForLoadState("networkidle");
  }

  static async waitForLoaderToDisappear(page: Page){
    await page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 45000 }).catch(() => {});
  }
}
