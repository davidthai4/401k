"use client";

import { useState, useEffect } from "react";
import { ContributionChart } from "@/components/ContributionChart";
import { calculateProjection, formatCurrency } from "@/lib/utils";
import { toast, Toaster } from "sonner";

export default function Home() {
  const [contributionType, setContributionType] = useState<"percent" | "fixed">("percent");
  const [percentValue, setPercentValue] = useState(6);
  const [fixedValue, setFixedValue] = useState(500);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [ytdContribution, setYtdContribution] = useState(7200);

  // Get the current value based on which mode we're in
  const currentValue = contributionType === "percent" ? percentValue : fixedValue;

  // Fetch data on load
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/contribution");
        const data = await res.json();
        setContributionType(data.contributionType);
        
        // Set the appropriate value based on type
        if (data.contributionType === "percent") {
          setPercentValue(data.contributionValue);
        } else {
          setFixedValue(data.contributionValue);
        }
        
        setYtdContribution(data.ytdContribution);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Save data
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const valueToSave = contributionType === "percent" ? percentValue : fixedValue;
      
      await fetch("/api/contribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contributionType,
          contributionValue: valueToSave,
        }),
      });
      
      toast.success("Contribution updated!", {
        description: `Your ${contributionType === "percent" ? percentValue + "%" : "$" + fixedValue} contribution has been saved.`,
      });
    } catch (error) {
      toast.error("Failed to update", {
        description: "Please try again later.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[var(--primary)]"></div>
          <div className="text-2xl font-bold tracking-tight">Human Interest</div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-[var(--muted-foreground)]">
            John Doe
          </span>
          <div className="h-10 w-10 rounded-full bg-[var(--secondary)]"></div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full bg-[var(--secondary)] px-4 py-1.5 text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              2025 Contribution Limits Updated
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-2">
              Your Retirement
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[var(--muted-foreground)]">
              is on track.
            </h1>
          </div>
          
          {/* YTD Stats */}
          <div>
            <div className="text-sm text-[var(--muted-foreground)]">YTD Contributions</div>
            <div className="text-3xl font-bold mt-1 text-green-600">
              {formatCurrency(ytdContribution)}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* LEFT COLUMN - Contribution Form + Employer Match */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* CARD 1: Contribution Form */}
            <div className="rounded-3xl bg-stone-100/80 p-8 shadow-sm ring-1 ring-black/5">
              <h2 className="text-xl font-bold mb-6">Contribution</h2>
              
              {/* Type Toggle */}
              <div className="mb-6">
                <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-black/5">
                  <button
                    onClick={() => setContributionType("percent")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      contributionType === "percent"
                        ? "bg-[var(--primary)] text-white shadow-md"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    Percentage
                  </button>
                  <button
                    onClick={() => setContributionType("fixed")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      contributionType === "fixed"
                        ? "bg-[var(--primary)] text-white shadow-md"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    Fixed Amount
                  </button>
                </div>
              </div>

              {/* Value Display */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 mb-6">
                <div className="text-sm text-[var(--muted-foreground)] mb-2">
                  Contribution {contributionType === "percent" ? "Rate" : "Amount"}
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">
                    {contributionType === "fixed" && "$"}
                    {currentValue}
                    {contributionType === "percent" && "%"}
                  </span>
                  <span className="text-[var(--muted-foreground)]">
                    / {contributionType === "percent" ? "paycheck" : "month"}
                  </span>
                </div>

                {/* Slider for Percent */}
                {contributionType === "percent" && (
                  <div className="space-y-4">
                    {/* The Slider */}
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={percentValue}
                        onChange={(e) => setPercentValue(Number(e.target.value))}
                        className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: percentValue >= 6
                            ? `linear-gradient(to right, #10b981 0%, #10b981 ${(percentValue / 30) * 100}%, #E8E4D9 ${(percentValue / 30) * 100}%, #E8E4D9 100%)`
                            : `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${(percentValue / 30) * 100}%, #E8E4D9 ${(percentValue / 30) * 100}%, #E8E4D9 100%)`
                        }}
                      />
                      
                      {/* 6% Marker Line */}
                      <div 
                        className="absolute top-0 w-0.5 h-3 bg-green-600"
                        style={{ left: '20%' }}
                      />
                    </div>

                    {/* Labels Below Slider */}
                    <div className="relative text-xs font-medium text-[var(--muted-foreground)] h-8">
                      <span className="absolute left-0">0%</span>
                      <span 
                        className="absolute -translate-x-1/2 text-green-600 font-bold"
                        style={{ left: '20%' }}
                      >
                        6%
                        <br />
                        <span className="text-[10px]">Match Limit</span>
                      </span>
                      <span className="absolute right-0">30%</span>
                    </div>

                    {/* Dynamic Feedback Message */}
                    {percentValue < 6 ? (
                      <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-amber-900">
                            Missing employer match
                          </div>
                          <div className="text-xs text-amber-700">
                            Increase to 6% to get an extra ${((120000 * 0.06 * 0.5) - (120000 * (percentValue / 100) * 0.5)).toLocaleString()} per year
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-green-900">
                            Maximizing employer match! ✓
                          </div>
                          <div className="text-xs text-green-700">
                            You're getting the full ${(120000 * 0.06 * 0.5).toLocaleString()} annual match
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Input for Fixed */}
                {contributionType === "fixed" && (
                  <input
                    type="number"
                    value={fixedValue}
                    onChange={(e) => setFixedValue(Number(e.target.value))}
                    className="w-full h-12 px-4 border border-[var(--border)] rounded-lg bg-stone-50 text-lg"
                    placeholder="Enter amount"
                  />
                )}
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full rounded-full bg-emerald-600 py-4 text-base font-medium text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                {isSaving ? "Updating..." : "Update Contribution"}
              </button>
            </div>

            {/* CARD 2: Employer Match */}
            <div className="rounded-3xl bg-[var(--primary)] p-8 text-[var(--primary-foreground)] shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold">Employer Match</h2>
              </div>
              <p className="mb-6 opacity-80">
                Your employer matches 50% of your contributions up to 6% of your salary.
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-sm">Annual Match</span>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    ${(() => {
                      const annualContribution =
                        contributionType === "percent"
                          ? 120000 * (percentValue / 100)
                          : fixedValue * 12;
                      const matchCap = 120000 * 0.06;
                      const matchableAmount = Math.min(annualContribution, matchCap);
                      return (matchableAmount * 0.5).toLocaleString();
                    })()}
                  </div>
                  <div className="text-xs opacity-60">Max $3,600/yr</div>
                </div>
              </div>
            </div>

          </div>
          {/* END OF LEFT COLUMN */}

          {/* RIGHT COLUMN - Chart */}
          <div className="lg:col-span-8">
            <div className="h-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 flex flex-col">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Projected Growth</h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Based on 7% annual return • Includes employer match
                </p>
              </div>
              
              {/* Chart Container */}
              <div className="flex-1 min-h-[400px]">
                <ContributionChart 
                  contributionValue={currentValue}
                  contributionType={contributionType}
                />
              </div>

              {/* Stats below chart */}
              <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border)]">
                <div>
                  <div className="text-xs text-[var(--muted-foreground)] mb-1">Starting Balance</div>
                  <div className="text-lg font-bold">{formatCurrency(142893)}</div>
                </div>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)] mb-1">10-Year Projection</div>
                  <div className="text-lg font-bold">
                    {formatCurrency(
                      calculateProjection(currentValue, contributionType)[10]?.amount || 0
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)] mb-1">Total Growth</div>
                  <div className="text-lg font-bold text-green-600">
                    +{formatCurrency(
                      (calculateProjection(currentValue, contributionType)[10]?.amount || 0) - 142893
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END OF RIGHT COLUMN */}

        </div>
        {/* END OF GRID */}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}