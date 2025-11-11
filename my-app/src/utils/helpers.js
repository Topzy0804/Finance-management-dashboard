// Small helper to format numbers as currency. Default exports a formatter function used by the invoice form.
export default function formatCurrency(value) {
  const n = Number(value) || 0;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);
  } catch (e) {
    return "$" + n.toFixed(2);
  }
}
