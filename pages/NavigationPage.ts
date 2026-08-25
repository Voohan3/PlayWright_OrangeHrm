import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NavigationPage extends BasePage {
  readonly adminMenu: Locator;
  readonly pimMenu: Locator;
  readonly leaveMenu: Locator;
  readonly recruitmentMenu: Locator;
  readonly dashboardMenu: Locator;

  constructor(page: Page) {
    super(page);

    this.dashboardMenu = page.getByRole("link", { name: "Dashboard" });
    this.adminMenu = page.getByRole("link", { name: "Admin" });
    this.pimMenu = page.getByRole("link", { name: "PIM" });
    this.leaveMenu = page.getByRole("link", { name: "Leave" });
    this.recruitmentMenu = page.getByRole("link", { name: "Recruitment" });
  }

  async openDashboard() {
    await this.click(this.dashboardMenu);
  }

  async openPIM() {
    await this.click(this.pimMenu);
  }

  async openAdmin() {
    await this.click(this.adminMenu);
  }

  async openLeave() {
    await this.click(this.leaveMenu);
  }

  async openRecruitment() {
    await this.click(this.recruitmentMenu);
  }
}
