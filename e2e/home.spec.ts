import { test, expect } from "@playwright/test";

test.describe("The Whovium home page", () => {
  test("Contains the title of the website", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    const heading = page.getByRole("heading").first();
    expect(heading).toHaveText(/whovium/i);
  });
});
