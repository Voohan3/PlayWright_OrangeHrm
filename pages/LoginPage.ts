import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { DashboardPage } from "./DashboardPage";
import { JsonUtil } from "../utils/JsonUtil";

const users = JsonUtil.read("test-data/users.json");
const adminUser = users.admin;


export class LoginPage extends BasePage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.username = page.locator("input[name='username']");
    this.password = page.locator("input[name='password']");
    this.loginButton = page.getByRole("button", {
      name: "Login",
    });
  }

  async open() {
    await this.page.goto("/");
  }

  async login(user: string, password: string) {
    await this.fill(this.username, user);
    await this.fill(this.password, password);
    await this.click(this.loginButton);
  }

  async loginAsAdmin() {
    const dashboardPage = new DashboardPage(this.page);
    await this.open();
    await this.login(adminUser.username, adminUser.password);
    await dashboardPage.verifyDashboard();
  }
}
