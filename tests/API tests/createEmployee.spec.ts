import { test, expect } from "@playwright/test";
import { EmployeeApi } from "../../api/EmployeeApi";
import { CreateEmployeeAPIRequest } from "../../models/Employee";
import { RandomDataUtil } from "../../utils/RandomDataUtil";

test("should create an employee successfully", async ({ request }) => {
  const employeeApi = new EmployeeApi(request);
  const timestamp = Date.now();
  const employeeId = RandomDataUtil.randomNumber(5);

  const employee: CreateEmployeeAPIRequest = {
    firstName: `Employee API`,
    middleName: "",
    lastName: `Test ${timestamp}`,
    employeeId: employeeId,
    empPicture: null,
  };

  const response = await employeeApi.createEmployee(employee);

  // Validate response structure
  expect(response).toHaveProperty("data");

  // Validate employee details
  expect(response.data.firstName).toBe(employee.firstName);
  expect(response.data.middleName).toBe(employee.middleName);
  expect(response.data.lastName).toBe(employee.lastName);
  expect(response.data.employeeId).toBe(employee.employeeId);

  // Validate generated employee number
  expect(response.data.empNumber).toBeDefined();
  expect(typeof response.data.empNumber).toBe("number");

  // Validate termination status
  expect(response.data.terminationId).toBeNull();

  // Validate additional response properties
  expect(response.meta).toEqual([]);
  expect(response.rels).toEqual([]);
});

test("should search employee by name", async ({ request }) => {
  const employeeApi = new EmployeeApi(request);

  const searchName = "John";

  const response = await employeeApi.getEmployees(searchName);

  // Validate response
  expect(response.data.length).toBeGreaterThan(0);

  // Validate that returned employee matches the search
  for (const employee of response.data) {
    const employeeDetails = [
      employee.firstName,
      employee.middleName,
      employee.lastName,
      employee.employeeId,
    ]
      .join(" ")
      .toLowerCase();

    expect(employeeDetails).toContain(searchName.toLowerCase());
  }
});
