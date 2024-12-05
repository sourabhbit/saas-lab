export const currencySymbol = (currency: string, value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(value);
};
