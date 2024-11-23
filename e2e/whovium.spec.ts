import { test, expect } from "@playwright/test";

test.describe("The Whovium home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("Has the website title set appropriately", async ({ page }) => {
    expect(page).toHaveTitle(/whovium/i);
  });

  test("Contains the title of the website", async ({ page }) => {
    const heading = page.getByRole("heading").first();
    expect(heading).toHaveText(/whovium/i);
  });

  test("Links to the board list page", async ({ page }) => {
    const boardListLink = page.getByRole("link").filter({ hasText: /boards/i });
    await boardListLink.click();

    await expect(page).toHaveURL(/.*boards/);
  });
});

test.describe("The board list page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/boards");
  });

  test("Contains the page heading", async ({ page }) => {
    const heading = page.getByRole("heading").first();
    expect(heading).toHaveText(/boards/i);
  });
});
