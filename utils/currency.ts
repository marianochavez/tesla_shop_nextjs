/**
 * It takes a number and returns a string with the number formatted as a currency
 * @param {number} value - The number to be formatted.
 * @returns A function that takes a number and returns a string.
 */
export const format = (value: number) => {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};
