import { test, expect } from "@playwright/test";

  test("Serch home in a Coruna", async ({ page }) => {
    await page.goto("https://www.booking.com");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(
        "Booking.com | Official site | The best hotels, flights, car rentals & accommodations");

    await page.locator('input[name="ss"]').fill('Coruña'); 


});

