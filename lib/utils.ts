import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
// Calculate 401k projection
export function calculateProjection(
  contributionValue: number,
  contributionType: "percent" | "fixed",
  salary: number = 120000,
  currentBalance: number = 142893,
  years: number = 10,
  annualReturn: number = 0.07
) {
  const data = [];
  let balance = currentBalance;
  const currentYear = new Date().getFullYear();

  // Calculate annual contribution
  const annualContribution =
    contributionType === "percent"
      ? salary * (contributionValue / 100)
      : contributionValue * 12;

  // Calculate employer match (50% up to 6% of salary)
  const matchCap = salary * 0.06; // $7,200 max
  const matchableAmount = Math.min(annualContribution, matchCap);
  const employerMatch = matchableAmount * 0.5;

  // Total annual contribution including employer match
  const totalAnnualContribution = annualContribution + employerMatch;

  for (let i = 0; i <= years; i++) {
    data.push({
      year: (currentYear + i).toString(),
      amount: Math.round(balance),
      // Optional: track contributions separately for the chart
      yourContribution: Math.round(annualContribution * i),
      employerContribution: Math.round(employerMatch * i),
    });

    // Add total contribution (yours + employer) and growth for next year
    balance = (balance + totalAnnualContribution) * (1 + annualReturn);
  }

  return data;
}