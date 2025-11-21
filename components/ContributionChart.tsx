"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { calculateProjection, formatCurrency } from "@/lib/utils";

interface ContributionChartProps {
  contributionValue: number;
  contributionType: "percent" | "fixed";
}

export function ContributionChart({ contributionValue, contributionType }: ContributionChartProps) {
  // Calculate the projection data
  const data = calculateProjection(contributionValue, contributionType);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border bg-white p-4 shadow-lg">
          <p className="mb-1 text-sm text-[var(--muted-foreground)]">{label}</p>
          <p className="text-xl font-bold">{formatCurrency(payload[0].value)}</p>
          {payload[0].payload.yourContribution && (
            <div className="mt-2 text-xs text-[var(--muted-foreground)]">
              <div>Your contributions: {formatCurrency(payload[0].payload.yourContribution)}</div>
              <div>Employer match: {formatCurrency(payload[0].payload.employerContribution)}</div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" vertical={false} />
          
          {/* X-axis (years) */}
          <XAxis 
            dataKey="year" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            dy={10}
          />
          
          {/* Y-axis (dollar amounts) */}
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            dx={-10}
          />
          
          {/* Tooltip on hover */}
          <Tooltip content={<CustomTooltip />} />
          
          {/* The actual line */}
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#10b981" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}