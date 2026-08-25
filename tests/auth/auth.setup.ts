import { test as setup, expect, Page } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { AuthManager } from "../../utils/AuthManager";
import { SessionValidator } from "../../utils/SessionValidator";

setup("Authenticate Admin User", async ({ page, browser }) => {
  const authManager = new AuthManager();
  const validator = new SessionValidator();

  authManager.createAuthDirectory();

  if (!authManager.storageStateExists()) {
    console.log("Storage state not found. Creating a new one...");
    await authenticate(page, authManager);
  } else {
    const isValid = await validator.validate(
      browser,
      authManager.getStorageStatePath(),
    );

    if (!isValid) {
      console.log("Storage state expired. Regenerating...");

      authManager.deleteStorageState();

      await authenticate(page, authManager);
    } else {
      console.log("Existing storage state is valid.");
    }
  }

  async function authenticate(
    page: Page,
    authManager: AuthManager,
  ): Promise<void> {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.loginAsAdmin();

    await expect(page).toHaveURL(/dashboard/);

    await page.context().storageState({
      path: authManager.getStorageStatePath(),
    });

    console.log("Storage state generated successfully.");
  }
});
