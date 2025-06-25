import { test, expect } from "@playwright/test";


test("Serch home in a Coruna", async ({ page }) => {
  await page.goto("https://www.booking.com");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    "Booking.com | Official site | The best hotels, flights, car rentals & accommodations");
  // Fill in the destination and press Enter 
  await page.locator('input[name="ss"]').fill('A Coruña');
  await page.waitForTimeout(2000); // autosuggest
  const pressEnter = await page.keyboard.press('Enter');await page.locator('body').click();

  console.log(pressEnter)

});

//prueba de commit
