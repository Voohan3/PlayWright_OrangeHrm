import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { EmployeeDetails } from "../models/Employee";
import { WaitUtil } from "../utils/WaitUtil";

export class PersonalDetailsPage extends BasePage {
  // ---------- Headings ----------
  readonly personalDetailsHeading: Locator;
  readonly successToast: Locator;

  // ---------- Employee Details ----------
  readonly employeeFirstName: Locator;
  readonly employeeMiddleName: Locator;
  readonly employeeLastName: Locator;
  readonly employeeId: Locator;

  // ---------- Profile Photo ----------
  readonly profilePhoto: Locator;

  // ---------- Gender ----------
  readonly genderField: Locator;
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;

  // ---------- Date of Birth ----------
  readonly dobInput: Locator;

  // ---------- Nationality ----------
  readonly nationalityDropdown: Locator;

  // ---------- Marital Status ----------
  readonly maritalStatusDropdown: Locator;

  // ---------- Save Buttons ----------
  readonly firstSaveButton: Locator;

  constructor(page: Page) {
    super(page);

    this.personalDetailsHeading = page.getByRole("heading", {
      name: "Personal Details",
    });

    this.successToast = page.locator(".oxd-toast");
    this.employeeFirstName = page.locator("input[name='firstName']");
    this.employeeMiddleName = page.locator("input[name='middleName']");
    this.employeeLastName = page.locator("input[name='lastName']");
    this.employeeId = page.locator("form input.oxd-input").nth(4);
    this.profilePhoto = page.locator("input[type='file']");
    this.genderField = page.locator(".--gender-grouped-field");
    this.maleRadio = this.genderField.locator('label:has(input[value="1"])');
    this.femaleRadio = this.genderField.locator('label:has(input[value="2"])');
    this.dobInput = page.locator("input[placeholder*='yyyy']").nth(1);
    this.nationalityDropdown = page.locator(".oxd-select-text").nth(0);
    this.maritalStatusDropdown = page.locator(".oxd-select-text").nth(1);
    this.firstSaveButton = page
      .getByRole("button", {
        name: "Save",
      })
      .first();
  }

  async verifyPersonalDetailsPage() {
    await expect(this.personalDetailsHeading).toBeVisible();
  }

  async uploadProfilePhoto(filePath: string) {
    await this.profilePhoto.setInputFiles(filePath);
  }

  async selectGender(gender: "Male" | "Female") {
    const radio = gender === "Male" ? this.maleRadio : this.femaleRadio;
    await this.waitForLoaderToDisappear();
    await radio.click();
  }

  async enterDateOfBirth(date: string) {
    await this.dobInput.click();
    await this.dobInput.fill(date);
  }

  async selectNationality(nationality: string) {
    await this.selectDropdown(this.nationalityDropdown, nationality);
  }

  async selectMaritalStatus(status: string) {
    await this.selectDropdown(this.maritalStatusDropdown, status);
  }

  async updateEmployeeDetails(details: EmployeeDetails) {
    await this.selectGender(details.gender);
    await this.selectNationality(details.nationality);
    await this.selectMaritalStatus(details.maritalStatus);
    await this.enterDateOfBirth(details.dateOfBirth);
    await this.savePersonalDetails();
  }

  async savePersonalDetails() {
    await this.firstSaveButton.click();
    await this.waitForPageLoad();
    await this.waitForLoaderToDisappear();
  }

  async verifySuccessMessage() {
    await expect(this.successToast).toContainText("Successfully Updated");
  }
}
