export const formatCurrencyDZD = (value) =>
  new Intl.NumberFormat("fr-DZ", { style: "currency", currency: "DZD" }).format(
    value
  );

export const formatCurrencyEUR = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "EUR" }).format(
    value
  );
