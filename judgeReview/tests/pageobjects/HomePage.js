const { test, expect } = require('@playwright/test')

exports.HomePage = class HomePage {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.searchBox = page.locator('input#search-input.dropdown-input');
    }
    async searchProduct(name) {
        await expect(this.page.getByText('Discover trusted products')).toBeVisible();
        await expect(this.page.getByPlaceholder('Search products')).toBeVisible();
        await this.searchBox.fill(name);
        await this.searchBox.press('Enter');
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByText(`results found for "${name}"`)).toBeVisible();
    }
};