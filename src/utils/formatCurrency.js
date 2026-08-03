export function formatCurrency(value, currency = "тенге") {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "—";
  }

  const formattedValue = new Intl.NumberFormat("ru-RU").format(value);

  return `${formattedValue} ${currency}`;
}
