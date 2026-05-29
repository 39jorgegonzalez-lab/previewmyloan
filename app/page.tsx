"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

const navItems = [
  "Dashboard",
  "Payment Preview",
  "Affordability",
  "Auto Loans",
  "Mortgage Tools",
  "Debt-to-Income",
  "Credit Insights",
];

export default function Home() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [apr, setApr] = useState(7.9);
  const [term, setTerm] = useState(60);

  const monthlyPayment = useMemo(() => {
    const monthlyRate = apr / 100 / 12;

    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);

    return payment || 0;
  }, [loanAmount, apr, term]);

  const totalPaid = monthlyPayment * term;
  const totalInterest = totalPaid - loanAmount;
  const payoffYears = (term / 12).toFixed(1);

  const affordability =
    monthlyPayment < 300
      ? "Excellent"
      : monthlyPayment < 600
      ? "Comfortable"
      : monthlyPayment < 900
      ? "Moderate"
      : "Risky";

  const affordabilityColor =
    monthlyPayment < 300
      ? "text-green-400"
      : monthlyPayment < 600
      ? "text-teal-300"
      : monthlyPayment < 900
      ? "text-yellow-300"
      : "text-red-400";

  const dtiWidth =
    monthlyPayment < 300
      ? "25%"
      : monthlyPayment < 600
      ? "38%"
      : monthlyPayment < 900
      ? "55%"
      : "75%";

  const paymentData = [
    { term: "12m", payment: monthlyPayment * 2.8 },
    { term: "24m", payment: monthlyPayment * 1.9 },
    { term: "36m", payment: monthlyPayment * 1.4 },
    { term: "48m", payment: monthlyPayment * 1.15 },
    { term: "60m", payment: monthlyPayment },
    { term: "72m", payment: monthlyPayment * 0.88 },
    { term: "84m", payment: monthlyPayment * 0.79 },
  ];

  const amortizationData = [];
  let remainingBalance = loanAmount;

  for (let month = 1; month <= 12; month++) {
    const monthlyInterest = remainingBalance * (apr / 100 / 12);
    const principalPaid = monthlyPayment - monthlyInterest;

    remainingBalance -= principalPaid;

    amortizationData.push({
      month,
      payment: monthlyPayment,
      principal: principalPaid,
      interest: monthlyInterest,
      balance: remainingBalance > 0 ? remainingBalance : 0,
    });
  }

  return (
    <main className="min-h-screen bg-[#04182D] text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-white/10 bg-[#061F3A] px-6 py-8">
          <div className="mb-10 text-2xl font-black tracking-tight">
            PREVIEW<span className="text-[#5ED1D1]">MYLOAN</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-10 rounded-3xl border border-[#5ED1D1]/30 bg-[#5ED1D1]/10 p-5">
            <p className="text-sm font-semibold text-[#9EF0F0]">
              Estimate-only platform
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              PREVIEWMYLOAN helps users explore possible loan scenarios before applying.
            </p>
          </div>
        </aside>

        <section className="px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#5ED1D1]">
                Financial Planning Dashboard
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
                Preview your next loan scenario.
              </h1>
            </div>

            <button className="rounded-2xl bg-white px-6 py-4 font-bold text-[#04182D] transition hover:bg-slate-200">
              Save Scenario
            </button>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-7 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">
                Interactive Payment Estimator
              </h2>
              <p className="mt-2 text-slate-400">
                Adjust values to preview estimated monthly payments.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-slate-300">Loan Amount</span>
                  <span className="text-2xl font-bold">
                    ${loanAmount.toLocaleString()}
                  </span>
                </div>

                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#5ED1D1]"
                />
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-slate-300">APR</span>
                  <span className="text-2xl font-bold">{apr}%</span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.1"
                  value={apr}
                  onChange={(e) => setApr(Number(e.target.value))}
                  className="w-full accent-[#5ED1D1]"
                />
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-slate-300">Loan Term</span>
                  <span className="text-2xl font-bold">{term} mo</span>
                </div>

                <input
                  type="range"
                  min="12"
                  max="84"
                  step="12"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full accent-[#5ED1D1]"
                />
              </div>
            </div>

            <div className="mt-10 rounded-[32px] border border-[#5ED1D1]/30 bg-[#031326] p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-[#5ED1D1]">
                Estimated Monthly Payment
              </p>

              <div className="mt-4 text-6xl font-black">
                ${monthlyPayment.toFixed(0)}
                <span className="text-3xl text-slate-400">/mo</span>
              </div>

              <div className={`mt-6 text-xl font-bold ${affordabilityColor}`}>
                Affordability: {affordability}
              </div>

              <div className="mt-6">
                <div className="mb-2 text-sm text-slate-400">
                  Estimated DTI Impact
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <div
                    className="h-3 rounded-full bg-[#5ED1D1]"
                    style={{ width: dtiWidth }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6">
              <p className="text-sm text-slate-400">Total Repayment</p>
              <p className="mt-4 text-4xl font-black">
                ${totalPaid.toFixed(0)}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Estimated total amount paid
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6">
              <p className="text-sm text-slate-400">Estimated Interest</p>
              <p className="mt-4 text-4xl font-black text-[#5ED1D1]">
                ${totalInterest.toFixed(0)}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Approximate interest cost
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6">
              <p className="text-sm text-slate-400">Payoff Timeline</p>
              <p className="mt-4 text-4xl font-black">{payoffYears} yrs</p>
              <p className="mt-2 text-sm text-slate-500">
                Estimated payoff duration
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.06] p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#5ED1D1]">
                  Payment Comparison
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  Loan Duration Impact
                </h2>
              </div>

              <div className="rounded-2xl bg-[#5ED1D1]/10 px-4 py-2 text-sm text-[#9EF0F0]">
                Live Financial Preview
              </div>
            </div>

            <div className="h-[320px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={paymentData}>
                  <XAxis dataKey="term" stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#061F3A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "16px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="payment"
                    stroke="#5ED1D1"
                    strokeWidth={4}
                    dot={{
                      fill: "#ffffff",
                      strokeWidth: 3,
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.06] p-8">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.2em] text-[#5ED1D1]">
                Quick Comparison
              </p>
              <h2 className="mt-2 text-3xl font-black">Compare Loan Terms</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "36 Months", factor: 1.4 },
                { label: "48 Months", factor: 1.15 },
                { label: "60 Months", factor: 1 },
                { label: "72 Months", factor: 0.88 },
              ].map((scenario) => (
                <div
                  key={scenario.label}
                  className="rounded-3xl border border-white/10 bg-[#031326] p-6 transition hover:border-[#5ED1D1]/40"
                >
                  <p className="text-sm text-slate-400">{scenario.label}</p>
                  <p className="mt-4 text-4xl font-black">
                    ${(monthlyPayment * scenario.factor).toFixed(0)}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Estimated monthly payment
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.05] p-8">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.2em] text-[#5ED1D1]">
                Loan Schedule
              </p>
              <h2 className="mt-2 text-3xl font-black">
                Amortization Breakdown
              </h2>
              <p className="mt-3 text-slate-400">
                Estimated payment allocation over the first 12 months.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-sm text-slate-400">
                    <th className="pb-2">Month</th>
                    <th className="pb-2">Payment</th>
                    <th className="pb-2">Principal</th>
                    <th className="pb-2">Interest</th>
                    <th className="pb-2">Balance</th>
                  </tr>
                </thead>

                <tbody>
                  {amortizationData.map((row) => (
                    <tr key={row.month} className="rounded-2xl bg-[#031326]">
                      <td className="rounded-l-2xl px-4 py-4 font-bold">
                        {row.month}
                      </td>
                      <td className="px-4 py-4">${row.payment.toFixed(0)}</td>
                      <td className="px-4 py-4 text-[#5ED1D1]">
                        ${row.principal.toFixed(0)}
                      </td>
                      <td className="px-4 py-4 text-yellow-300">
                        ${row.interest.toFixed(0)}
                      </td>
                      <td className="rounded-r-2xl px-4 py-4 text-slate-300">
                        ${row.balance.toFixed(0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.05] p-6">
            <p className="text-sm text-slate-400">Disclaimer</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              PREVIEWMYLOAN provides estimate-only educational tools and is not a
              lender, broker, or financial advisor.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}