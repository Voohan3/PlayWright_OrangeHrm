import { Page } from "@playwright/test";

export class ScreenshotUtil {
  static async capture(page: Page, name: string) {
    await page.screenshot({
      path: `screenshots/${name}.png`,

      fullPage: true,
    });
  }
}
