import { test, expect } from "@playwright/test";
import { selectAvailableCheckInDate } from '../Utils/Utils'
import { logConsoleResults } from '../Utils/Utils';
 import { checkLoginGoogle } from "../Utils/Utils";

test("Serch home in a Coruna", async ({ page }) => {
  await page.goto("https://www.booking.com");


  // Check Google login
  // await checkLoginGoogle(page) [DOES NOT close the login modal and the behavior is incorrect in FireFox]
  await checkLoginGoogle(page)
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    "Booking.com | Official site | The best hotels, flights, car rentals & accommodations");
 
 
    // Fill in the destination and press Enter 
  await page.locator('input[name="ss"]').fill('A Coruña');
  await page.waitForTimeout(3000); // autosuggest

  await page.keyboard.press('Enter');

  // Selección de fechas (check-in y check-out)
  const { checkIn, checkOut } = await selectAvailableCheckInDate(page);
await checkLoginGoogle(page)
   // Show selected dates in console
  logConsoleResults('Check-in', checkIn);
  logConsoleResults('Check-out', checkOut);


  // Click the Search button
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForLoadState('networkidle'); // espera a que cargue la página de resultados

  // Show in console the total number of properties found
  const totalPropertiesText = await page.locator('[data-testid="property-card"]').count();
  console.log(`🔢 Total de propiedades encontradas: ${totalPropertiesText}`);

  // Validate that the check-in date is the 1st of the next month
  await expect(page.locator('[data-testid="date-display-field-start"]')).toContainText('1');

  // Validate that the check-out date is the 7th of the next month
  await expect(page.locator('[data-testid="date-display-field-end"]')).toContainText('7');

  // Print in console the names of the properties on the first page
  const accommodations = await page.locator('[data-testid="title"]').allTextContents();
  logConsoleResults('Total accommodations', accommodations);

});


