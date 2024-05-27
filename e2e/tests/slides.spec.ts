import { test, expect } from "@playwright/test";

const pageUrl = process.env.WEBSITE_URL || "http://localhost:3030/";

test("has title", async ({ page }) => {
  await page.goto(pageUrl);
  await expect(page).toHaveTitle(/Automated Deployments with GitHub Actions/);
});

test("Check name is shown", async ({ page }) => {
  await page.goto(pageUrl);

  const button = page.getByRole("button", { name: "Go to next slide" });
  await button.hover();
  await button.click();
  await button.click();

  const slide = page.locator(`div[data-slidev-no="2"]`);
  await expect(slide).toBeVisible();

  const hello = slide.locator(`h1`);
  const name = slide.locator(`h2`);

  await expect(hello).toHaveText(/Hello/);
  await expect(name).toHaveText(/Xavi/);
});
