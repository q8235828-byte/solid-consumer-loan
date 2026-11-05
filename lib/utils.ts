import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CurrencyCode = "USD" | "EUR";

// Universal dual-currency formatter (USD & EUR only)
export function formatMoney(amount: number, currency: CurrencyCode = "USD"): string {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}

// Backward compatibility helper
export function formatEUR(amount: number): string {
  return formatMoney(amount, "EUR");
}

export function formatUSD(amount: number): string {
  return formatMoney(amount, "USD");
}
