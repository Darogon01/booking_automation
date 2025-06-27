import { Page, expect } from '@playwright/test';

export const formatDate = (year: number, month: number, day: number): string =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

export const selectAvailableCheckInDate = async (page: Page): Promise<{ checkIn: string, checkOut: string }> => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  let checkIn = formatDate(currentYear, currentMonth, 1);
  let checkOut = formatDate(currentYear, currentMonth, 7);

  // Comprobar si la fecha está visible
  const isCheckInVisible = await page.locator(`span[data-date="${checkIn}"]`).isVisible();

  if (!isCheckInVisible) {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    checkIn = formatDate(nextYear, nextMonth, 1);
    checkOut = formatDate(nextYear, nextMonth, 7);
  }

  // Seleccionar fechas visibles
  await expect(page.locator(`span[data-date="${checkIn}"]`)).toBeVisible();
  await page.click(`span[data-date="${checkIn}"]`);

  await expect(page.locator(`span[data-date="${checkOut}"]`)).toBeVisible();
  await page.click(`span[data-date="${checkOut}"]`);

  return { checkIn, checkOut };
};

export const logConsoleResults = (label: string, data: string | number | string[]) => {
  const output = Array.isArray(data) ? data.join('\n') : data;
  console.log(`📌 ${label}:`, output)
}

export const checkLoginGoogle = async (page: Page) => {
  const popUpLocator = page.locator('.haAclf.WsjYwc-haAclf')
  const isVisible = await popUpLocator.isVisible().catch(() => false)
  if (isVisible) {
   console.log('🔒 Google login popup detected, closing it...'); 
   const closeButton = page.locator('[id="close"][role="button"][aria-label="Cerrar"]')
    try {
      await closeButton.waitFor({ state: 'visible', timeout: 5000 });
      await closeButton.click();
      //  Esperamos que el modal desaparezca realmente
      await popUpLocator.waitFor({ state: 'hidden', timeout: 5000 });
      console.log('✅ Google popup successfully closed.');
    } catch (error) {
      console.error('❌ Failed to close Google popup:', error);
      throw error; // Detiene el test si no lo cierra
    }
  }
  else{
    console.log('✅ No Google login popup detected, continuing...');
  }
}