export function formatPrice(price?: string | null): string {
  const value = price?.trim() ?? "";
  if (!value || !/\d/.test(value)) return value;

  const amount = value.replace(/\s*(?:kr\.?|sek)$/i, "").trim();
  return `${amount} kr`;
}
