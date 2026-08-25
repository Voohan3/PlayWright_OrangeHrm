import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
  readonly heading;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole("heading", {
      name: "Dashboard",
    });
  }

  async verifyDashboard() {
    await this.shouldBeVisible(this.heading);
  }
}
