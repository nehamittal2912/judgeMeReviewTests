const { test, expect } = require('@playwright/test')

exports.ProductResultPage = class ProductResultPage {

    /**
       * @param {import('@playwright/test').Page} page
       */
    constructor(page) {
        this.page = page;
        this.select_country = page.getByRole('combobox').nth(1);
        this.select_ship_to = page.getByRole('combobox').nth(2);
        this.select_price_in = page.getByRole('combobox').nth(3);
        this.country_icon= page.getByAltText('country icon for GB');
        this.overall_rating= page.getByText('Overall rating');
        this.select_rating= page.getByLabel('star').locator('span').nth(4);
        this.review_badge=page.locator('.product-search-card__review-badge--rating');
        this.reviews = page.getByText('Reviews', { exact: true }).nth(1);
        this.select_more_50 = page.getByText('50 or more');
        this.reviews_badge_count = page.locator(".product-search-card__review-badge-reviews-count-section");
        this.over_100 = page.getByText('Over £');
        this.product_price =page.locator(".product-search-card__price");

    }

    async SearchProductFilters() {
        await expect(this.page.getByText('Country / Currency')).toBeVisible();

        await expect(this.page.getByText('Store country')).toBeVisible();
        await this.select_country.selectOption({ label: 'United Kingdom' });

        await expect(this.page.getByText('Ship To')).toBeVisible();
        await this.select_ship_to.selectOption({ label: 'United Kingdom' });

        await expect(this.page.getByText('Show prices in').nth(1)).toBeVisible();
        await this.select_price_in.selectOption({ label: 'GBP' });

    }

};