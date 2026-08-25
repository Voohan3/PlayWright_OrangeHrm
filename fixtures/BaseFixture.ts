import { test as base } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { PIMPage } from "../pages/PIMPage";
import { AddEmployeePage } from "../pages/AddEmployee";
import { NavigationPage } from "../pages/NavigationPage";
import { PersonalDetailsPage } from "../pages/PersonalDetailsPage";
import { EmployeeApi } from "../api/EmployeeApi";

type testFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PIMPage;
  addEmployeePage: AddEmployeePage;
  navigationPage: NavigationPage;
  personalDetailsPage: PersonalDetailsPage;
  employeeApi: EmployeeApi;
};

export const test = base.extend<testFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  pimPage: async ({ page }, use) => {
    await use(new PIMPage(page));
  },
  addEmployeePage: async ({ page }, use) => {
    await use(new AddEmployeePage(page));
  },
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  personalDetailsPage: async ({ page }, use) => {
    await use(new PersonalDetailsPage(page));
  },
  employeeApi: async ({ request }, use) => {
    await use(new EmployeeApi(request));
  }
});

export { expect } from "@playwright/test";
