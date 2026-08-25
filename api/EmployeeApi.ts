import { APIRequestContext } from "@playwright/test";
import { BaseApi } from "./BaseApi";
import {
  CreateEmployeeAPIRequest,
  GetEmployeesResponse,
} from "../models/Employee";

export class EmployeeApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createEmployee(employee: CreateEmployeeAPIRequest) {
    const response = await this.request.post(
      "/web/index.php/api/v2/pim/employees",
      {
        data: employee,
      },
    );

    await this.verifySuccessResponse(response, 200);
    return await response.json();
  }

  async getEmployees(
    nameOrId: string,
    includeEmployees = "onlyCurrent",
  ): Promise<GetEmployeesResponse> {
    const response = await this.request.get(
      "/web/index.php/api/v2/pim/employees",
      {
        params: {
          nameOrId,
          includeEmployees,
        },
      },
    );

    await this.verifySuccessResponse(response, 200);

    return await response.json();
  }
}
