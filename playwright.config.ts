import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({
  path: `config/${process.env.ENV || "qa"}.env`,
});

export default defineConfig({
  testDir: "./tests",
  timeout: 90000,
  retries: 0,
  workers: 1,
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.HEADLESS === "true",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    actionTimeout: 15000,
    navigationTimeout: 30000,
    storageState: ".auth/admin.json",
  },
  reporter: [["dot"], ["html", { open: "never" }], ["list"], ["allure-playwright",  {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }]],
  projects: [
    {
      name: "setup",
      testMatch: /.*auth\.setup\.ts/,
      // This project creates the auth file, so it cannot attempt to load it.
      use: {
        storageState: { cookies: [], origins: [] },
      },
    },

    {
      name: "chromium",
      use: {
        browserName: "chromium",
        storageState: ".auth/admin.json",
      },
      dependencies: ["setup"],
    },
  ],
});
