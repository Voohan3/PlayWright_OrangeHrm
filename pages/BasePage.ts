import { Page, Locator, expect } from "@playwright/test";
import { WaitUtil } from "../utils/WaitUtil";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url, { waitUntil: "load" });
  }

  async click(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: 15000 });
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await expect(locator).toBeVisible({ timeout: 15000 });
    await locator.fill(value);
  }

  async text(locator: Locator) {
    return await locator.textContent();
  }

  async shouldBeVisible(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: 15000 });
  }

  async shouldContain(locator: Locator, text: string) {
    await expect(locator).toContainText(text, { ignoreCase: true });
  }

  async type(locator: Locator, value: string) {
    await expect(locator).toBeVisible();
    await locator.pressSequentially(value);
  }

  async getText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  async isVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async isEnabled(locator: Locator) {
    await expect(locator).toBeEnabled();
  }

  async selectDropdown(optionList: Locator, option: string) {
    await optionList.click();
    await this.page.getByRole("option", { name: option }).click();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("load");
  }

  async waitForLoaderToDisappear() {
    await WaitUtil.waitForLoaderToDisappear(this.page);
  }
}
