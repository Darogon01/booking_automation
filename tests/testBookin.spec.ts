import { test, expect } from "@playwright/test";
import { selectAvailableCheckInDate } from '../Utils/Utils'


test("Serch home in a Coruna", async ({ page }) => {
  await page.goto("https://www.booking.com");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    "Booking.com | Official site | The best hotels, flights, car rentals & accommodations");
  // Fill in the destination and press Enter 
  await page.locator('input[name="ss"]').fill('A Coruña');
  await page.waitForTimeout(2000); // autosuggest
  await page.keyboard.press('Enter');
  // Selección de fechas (check-in y check-out)
  const { checkIn, checkOut } = await selectAvailableCheckInDate(page);

  console.log('✅ Fechas seleccionadas:');
  console.log(`Check-in: ${checkIn}`);
  console.log(`Check-out: ${checkOut}`);


});

//prueba de commit
