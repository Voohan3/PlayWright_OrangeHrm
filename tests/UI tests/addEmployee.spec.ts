import { test } from "../../fixtures/BaseFixture";
import { CreateEmployeeAPIRequest, Employee } from "../../models/Employee";
import { JsonUtil } from "../../utils/JsonUtil";
import { RandomDataUtil } from "../../utils/RandomDataUtil";

const user = JsonUtil.read("test-data/users.json").user;
const employee = JsonUtil.read("test-data/employees.json").employee;

test.describe("PIM - Employee Management", () => {
  test.beforeEach(async ({ page, navigationPage }) => {
    await page.goto("/web/index.php/dashboard/index");
    await page.waitForLoadState("load");
    await navigationPage.openPIM();
  });

   test("Search existing employee", async ({
      pimPage, employeeApi,
      page,
    }) => {
      const employeeViaAPI: CreateEmployeeAPIRequest = {
        firstName: "John",
        middleName: RandomDataUtil.randomString(8),
        lastName: RandomDataUtil.randomString(10),
        employeeId: RandomDataUtil.randomNumber(7).toString()
      };
      await employeeApi.createEmployee(employeeViaAPI);
      await pimPage.reloadPage();
      await page.waitForLoadState("load");
  
      await pimPage.searchEmployee(employeeViaAPI.firstName);
      await pimPage.verifySearchResult(employeeViaAPI.firstName);
    });

  test("Add new employee", async ({
    pimPage,
    addEmployeePage,
    page,
  }) => {
    const employee: Employee = {
      firstName: "John",
      lastName: RandomDataUtil.randomString(8),
      middleName: RandomDataUtil.randomString(5),
      employeeId: RandomDataUtil.randomNumber(7).toString(),
    };
    await pimPage.openAddEmployee();
    await addEmployeePage.addEmployee(employee);
    await addEmployeePage.verifyEmployeeCreated();
  });

  test("Edit Employee Personal Details", async ({
  pimPage,
  addEmployeePage,
  personalDetailsPage,
}) => {   
  const employee: Employee = {
    firstName: RandomDataUtil.randomString(6),
    middleName: RandomDataUtil.randomString(8),
    lastName: RandomDataUtil.randomString(10),
    employeeId: RandomDataUtil.randomNumber(5).toString(),
  };

  // Create employee
  await pimPage.openAddEmployee();
  await addEmployeePage.addEmployee(employee);
  await addEmployeePage.verifyEmployeeCreated();

  // Update personal details
  await personalDetailsPage.updateEmployeeDetails({ photo: "test-data/profile-photo.png", 
    nationality: "Indian",
    maritalStatus: "Single",
    gender: "Male",
    dateOfBirth: "1995-01-01"
});

  await personalDetailsPage.verifySuccessMessage();
});
});
