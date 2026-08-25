import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Employee } from "../models/Employee";
import { RandomDataUtil } from "../utils/RandomDataUtil";

export class AddEmployeePage extends BasePage {
  readonly firstName: Locator;
  readonly middleName: Locator;
  readonly lastName: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly personalDetailsHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.firstName = page.locator('input[name="firstName"]');
    this.middleName = page.locator('input[name="middleName"]');
    this.lastName = page.locator('input[name="lastName"]');
    this.employeeIdInput = this.page
      .locator(".oxd-input-group", {
        has: this.page.locator("label", { hasText: "Employee Id" }),
      })
      .locator("input");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.personalDetailsHeading = page.getByRole("heading", {
      name: "Personal Details",
    });
  }

  async addEmployee(employee: Employee) {
    await this.fill(this.firstName, employee.firstName);
    await this.fill(this.middleName, employee.middleName);
    await this.fill(this.lastName, employee.lastName);
    await this.fill(this.employeeIdInput, employee.employeeId);
    await this.click(this.saveButton);
  }

  async verifyEmployeeCreated() {
    await this.waitForPageLoad();
    await this.waitForLoaderToDisappear();
    await this.shouldBeVisible(this.personalDetailsHeading);
  }
}
