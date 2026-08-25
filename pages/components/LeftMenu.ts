import { Locator, Page } from "@playwright/test";

export class LeftMenu {
  readonly page: Page;
  readonly pim: Locator;
  readonly admin: Locator;
  readonly leave: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pim = page.getByRole("link", {
      name: "PIM",
    });
    this.admin = page.getByRole("link", {
      name: "Admin",
    });
    this.leave = page.getByRole("link", {
      name: "Leave",
    });
  }

  async openPIM() {
    await this.pim.click();
  }
}
