import { Page, expect, Frame } from '@playwright/test';

export const formatDate = (year: number, month: number, day: number): string =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

export const selectAvailableCheckInDate = async (page: Page): Promise<{ checkIn: string, checkOut: string }> => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  let checkIn = formatDate(currentYear, currentMonth, 1);
  let checkOut = formatDate(currentYear, currentMonth, 7);

  // Check if the date is visible
  const isCheckInVisible = await page.locator(`span[data-date="${checkIn}"]`).isVisible();

  if (!isCheckInVisible) {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    checkIn = formatDate(nextYear, nextMonth, 1);
    checkOut = formatDate(nextYear, nextMonth, 7);
  }

  // Select visible dates
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

// docs param
/**
 * Cierra el diálogo de inicio de sesión con Google (One Tap).
 * - Intenta hacer clic en el botón de cerrar dentro del iframe.
 * - Si no encuentra el botón, oculta el iframe desde el DOM principal.
 *
 * @param page Instancia de Playwright Page
 */
export async function checkLoginGoogle(page: Page): Promise<void> {
  try {
    // Espera a que aparezca el iframe de Google One Tap
    const iframeHandle = await page.waitForSelector(
      'iframe[src*="accounts.google.com/gsi/iframe/select"]',
      { timeout: 5000 }
    );

    const frame: Frame | null = await iframeHandle.contentFrame();

    if (frame) {
      // Intenta hacer clic en el botón "X" (cerrar)
      const closeBtn = await frame.$('button[aria-label="Cerrar"]');

      if (closeBtn) {
        await closeBtn.click();
        console.log('Popup de Google cerrado con botón.');
        return;
      }
    }

    // Si no se encontró botón o iframe no accesible, ocultar iframe manualmente
    await page.evaluate(() => {
      const iframe = document.querySelector(
        'iframe[src*="accounts.google.com/gsi/iframe/select"]'
      );
      if (iframe?.parentElement) {
        iframe.parentElement.style.display = 'none';
      }
    });

    console.log('Popup de Google ocultado desde el DOM.');
  } catch (error) {
    console.warn('No se encontró el popup de Google o ya estaba cerrado.');
  }
}