const { test, expect } = require('@playwright/test');
const { HomePage } = require('./pageobjects/HomePage');
const { ProductResultPage } = require('./pageobjects/ProductResultPage');

/** @type {import('@playwright/test').Page} */
let page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  const homePage = new HomePage(page);
  await page.goto('https://judge.me/reviews/');
  await expect(page).toHaveTitle(/reviews/);
  await homePage.searchProduct('Plants');
});

test('search the product for a specific country only', async () => {
  const productResultPage = new ProductResultPage(page);
  await productResultPage.SearchProductFilters();
  await expect(productResultPage.country_icon).toHaveCount(24);
});

test('search the product with Atleast 4.5 stars', async () => {
  const productResultPage = new ProductResultPage(page);
  await expect(productResultPage.overall_rating).toBeVisible();
  await productResultPage.select_rating.click();
  await page.waitForLoadState('networkidle');
  await productResultPage.review_badge.last().waitFor();
  const rows = productResultPage.review_badge;
  const count = await rows.count()
  for (let i = 0; i < count; ++i) {
    const text = await rows.nth(i).textContent();
    const value = parseFloat(text);
    expect(value).toBeGreaterThanOrEqual(4.5);
  }
});

test('search the product reviews 50 or more', async () => {
  const productResultPage = new ProductResultPage(page);
  await expect(productResultPage.reviews).toBeVisible();
  await expect(productResultPage.select_more_50).toBeVisible();
  await productResultPage.select_more_50.click();
  await page.waitForLoadState('networkidle');
  await productResultPage.reviews_badge_count.last().waitFor();
  const items = productResultPage.reviews_badge_count;
  const count = await items.count()
  for (let i = 0; i < count; ++i) {
    const text = await items.nth(i).textContent();
    const matches = text.replace(/[^0-9]/g, '')
    const value = parseInt(matches)
    expect(value).toBeGreaterThanOrEqual(50);
  }
})

  test.skip('search a prduct with price over 100 pounds', async () => {
    const productResultPage = new ProductResultPage(page);
    await productResultPage.SearchProductFilters();
    await productResultPage.over_100.click()
    await page.waitForLoadState('networkidle');
    await productResultPage.product_price.last().waitFor();
    const items = productResultPage.product_price;
    const count = await items.count()
    for (let i = 0; i < count; ++i) {
      const text = await items.nth(i).textContent();
      const matches = text.replace( /£.*\\/i, '')
      const value = parseFloat(matches)
      expect(matches).toBeGreaterThanOrEqual(1000);
    }
  })







