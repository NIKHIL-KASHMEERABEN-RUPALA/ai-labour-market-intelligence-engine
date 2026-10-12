/**
 * Indian Number System Formatter
 * Formats numbers according to Indian numbering standards (e.g. 4,82,450 instead of 482,450)
 */
export function formatIndianNumber(num: number | string): string {
  const n = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(n)) return '0';

  const isNegative = n < 0;
  const absVal = Math.abs(n);
  const parts = absVal.toString().split('.');
  let integerPart = parts[0];
  const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

  if (integerPart.length <= 3) {
    return (isNegative ? '-' : '') + integerPart + decimalPart;
  }

  // Last 3 digits
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);
  
  // Remaining digits grouped by 2
  const formattedOthers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  const result = formattedOthers + ',' + lastThree + decimalPart;

  return isNegative ? '-' + result : result;
}

export function formatIndianCurrency(amountInCrores: number): string {
  return `₹${formatIndianNumber(amountInCrores.toFixed(1))} Cr`;
}

export function formatPercent(value: number, includeSign: boolean = true): string {
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}
