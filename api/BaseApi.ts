import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export abstract class BaseApi {
  protected readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  protected async verifySuccessResponse(
    response: APIResponse,
    expectedStatus = 200,
  ): Promise<void> {
    expect(response.status()).toBe(expectedStatus);
  }
}
