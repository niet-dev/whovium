import { test, expect } from "@playwright/test";

test.describe("The Whovium home page", () => {
  test("has the website title set appropriately", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/whovium/i);
  });

  test("contains the title of the website", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading").first()).toHaveText(/whovium/i);
  });

  test("links to the board list page", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("link")
      .filter({ hasText: /boards/i })
      .click();

    await expect(page).toHaveURL(/.*boards/);
  });
});

test.describe("The board list page", () => {
  test("contains the page heading", async ({ page }) => {
    await page.goto("/boards");

    await expect(page.getByRole("heading").first()).toHaveText(/boards/i);
  });

  test("displays 10 boards", async ({ page }) => {
    await page.goto("/boards");

    await expect(page.getByRole("listitem")).toHaveCount(10);
  });

  test("allows users to search for boards", async ({ page }) => {
    await page.goto("/boards");

    await page.getByRole("searchbox").fill("A song");
    await expect(
      page.getByRole("listitem").filter({ hasText: "A song" }).first(),
    ).toBeVisible();
  });

  test("adds search params to the URL", async ({ page }) => {
    await page.goto("/boards");

    await page.getByRole("searchbox").fill("A song");
    await expect(page).toHaveURL(/.*\?query=A\+song/);
  });

  test("notifies a user when there is no matching search", async ({ page }) => {
    await page.goto("/boards");

    await page.getByRole("searchbox").fill("definitely no matching results");
    await expect(
      page.getByRole("paragraph").filter({ hasText: "No data" }),
    ).toBeVisible();
  });

  test("allows a user to navigate to the next page", async ({ page }) => {
    await page.goto("/boards");

    await page.getByLabel("right page link").first().click();
    await expect(page).toHaveURL(/.*\?page=2/);
  });

  test("allows a user to navigate to the previous page", async ({ page }) => {
    await page.goto("/boards?page=2");

    await page.getByLabel("left page link").first().click();
    await expect(page).toHaveURL(/.*\?page=1/);
  });

  test("prevents a user from navigating before the first page", async ({
    page,
  }) => {
    await page.goto("/boards");

    await expect(
      page.getByLabel("disabled left page link").first(),
    ).toBeVisible();
  });

  test("prevents a user from navigating past the last page", async ({
    page,
  }) => {
    await page.goto("/boards?page=10");

    await expect(
      page.getByLabel("disabled right page link").first(),
    ).toBeVisible();
  });

  test("removes the page parameter when a search is performed", async ({
    page,
  }) => {
    await page.goto("/boards?page=2");
    await page.getByRole("searchbox").fill("A song");

    await expect(page).not.toHaveURL(/.*\?page=2/);
  });

  test("navigates to the board's page when the title is clicked", async ({
    page,
  }) => {
    await page.goto("/boards");
    await page
      .getByRole("listitem")
      .first()
      .getByRole("heading", { level: 2 })
      .getByRole("link")
      .click();
    await expect(page).toHaveURL(/.*boards\/\d+/);
  });

  test("navigates to the board's page when the play button is clicked", async ({
    page,
  }) => {
    await page.goto("/boards");
    await page
      .getByRole("listitem")
      .first()
      .getByLabel("Button container")
      .getByRole("link")
      .click();
    await expect(page).toHaveURL(/.*boards\/\d+/);
  });

  test("navigates to the author's page when the author's name is clicked", async ({
    page,
  }) => {
    await page.goto("/boards");

    const author = await page
      .getByRole("listitem")
      .first()
      .getByLabel("Created by")
      .getByRole("link");
    const authorName = await author.innerText();
    await author.click();

    await expect(page).toHaveURL(`/users/${authorName}`);
  });
});
