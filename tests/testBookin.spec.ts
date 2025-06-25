import { test, expect } from "@playwright/test";
import { selectAvailableCheckInDate } from '../Utils/Utils'
import { logConsoleResults} from '../Utils/Utils';

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

  //Mostran en consola fechcas seleccionadas
  logConsoleResults ('Check-in', checkIn);
  logConsoleResults ('Check-out', checkOut);


  //Click en el botón Buscar
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForLoadState('networkidle'); // espera a que cargue la página de resultados

  //Mostrar en consola el número total de propiedades encontradas
  const totalPropertiesText = await page.locator('[data-testid="property-card"]').count();
  console.log(`🔢 Total de propiedades encontradas: ${totalPropertiesText}`);

  //Validar que la fecha de Check-in sea el día 1 del próximo mes
  await expect(page.locator('[data-testid="date-display-field-start"]')).toContainText('1');

  //Validar que la fecha de Check-out sea el día 7 del próximo mes
  await expect(page.locator('[data-testid="date-display-field-end"]')).toContainText('7');

  //Imprimir en consola los nombres de las propiedades en la primera página
  const accommodations = await page.locator('[data-testid="title"]').allTextContents();
  logConsoleResults ('Total accommodations', accommodations);



});

//prueba de commit
