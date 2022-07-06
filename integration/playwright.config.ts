import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import { devices as replayDevices } from "@replayio/playwright";

const config: PlaywrightTestConfig = {
  testDir: ".",
  testMatch: ["**/*-test.ts"],
  /* Maximum time one test can run for. */
  timeout: 30_000,
  expect: {
    /* Maximum time expect() should wait for the condition to be met. */
    timeout: 5_000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : [["html", { open: "never" }]],
  use: { actionTimeout: 0 },

  projects: [
    {
      name: "replay-firefox",
      use: { ...(replayDevices["Replay Firefox"] as any) },
    },
    {
      name: "replay-chromium",
      use: { ...(replayDevices["Replay Chromium"] as any) },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chromium"] },
    },
  ],
};

export default config;
