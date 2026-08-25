import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/Logger";

export class PIMPage extends BasePage {
  readonly employeeNameInput;
  readonly searchButton;
  readonly addButton;
  readonly resultTableRow;

  constructor(page: Page) {
    super(page);

    this.employeeNameInput = page.locator(
      "//*[text()='Employee Name']/../..//input[@placeholder='Type for hints...']",
    );
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.addButton = page.getByRole("button", { name: "Add" });
    this.resultTableRow = page.locator(".oxd-table-card");
  }

  async reloadPage() {
    await this.page.reload();
    await this.waitForPageLoad();
    await this.waitForLoaderToDisappear();
  }

  async searchEmployee(name: string) {
    await this.fill(this.employeeNameInput, name);
    const [] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/api/v2/pim/employees") &&
          response.status() === 200,
      ),
      this.click(this.searchButton),
    ]);
    await this.waitForPageLoad();
    await this.waitForLoaderToDisappear();
  }

  async openAddEmployee() {
    await this.click(this.addButton);
    await this.waitForPageLoad();
    await this.waitForLoaderToDisappear();
  }

  async verifySearchResult(name: string) {
    const rows = await this.resultTableRow.count();
    if (rows === 0) {
      logger.info(`No search results found for employee: ${name}`);
    }
    for (let i = 0; i < rows - 1; i++) {
      const row = this.resultTableRow
        .nth(i)
        .getByRole("cell")
        .nth(2)
        .locator("div");

      await this.shouldContain(row, name);
    }
  }
}
