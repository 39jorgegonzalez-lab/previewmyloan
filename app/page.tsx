const tools = [
  { name: "Payment Estimator", value: "$506/mo", note: "Based on sample loan inputs" },
  { name: "Affordability Range", value: "$18k–$32k", note: "Estimated borrowing window" },
  { name: "Budget Impact", value: "14%", note: "Estimated monthly income share" },
];

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
  return (
    <main className="min-h-screen bg-[#04182D] text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr_340px]">

        {/* Sidebar */}
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

        {/* Main Dashboard */}
        <section className="px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#5ED1D1]">
                Financial Planning Dashboard
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
                Preview your next loan scenario.
              </h1>
            </div>

            <button className="rounded-2xl bg-white px-6 py-4 font-bold text-[#04182D] transition hover:bg-slate-200">
              New Preview
            </button>
          </div>

          {/* Top Metrics */}
          <div className="grid gap-5 md:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 shadow-2xl"
              >
                <p className="text-sm text-slate-400">{tool.name}</p>
                <div className="mt-4 text-4xl font-black">{tool.value}</div>
                <p className="mt-3 text-sm text-slate-400">{tool.note}</p>
              </div>
            ))}
          </div>

          {/* Main Workspace */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Payment Timeline</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Sample monthly payment comparison by loan term.
                  </p>
                </div>
                <span className="rounded-full bg-[#5ED1D1]/15 px-4 py-2 text-sm text-[#9EF0F0]">
                  Live preview
                </span>
              </div>

              <div className="flex h-72 items-end gap-4 rounded-3xl bg-[#031326] p-6">
                {[72, 58, 46, 38, 31].map((height, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-3">
                    <div
                      className="w-full rounded-t-2xl bg-gradient-to-t from-[#5ED1D1] to-[#78A8FF]"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-slate-400">
                      {index + 2} yr
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-7">
              <h2 className="text-2xl font-bold">Loan Snapshot</h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-[#031326] p-5">
                  <p className="text-sm text-slate-400">Loan Amount</p>
                  <p className="mt-2 text-3xl font-black">$25,000</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#031326] p-5">
                    <p className="text-sm text-slate-400">APR</p>
                    <p className="mt-2 text-2xl font-bold">7.9%</p>
                  </div>

                  <div className="rounded-2xl bg-[#031326] p-5">
                    <p className="text-sm text-slate-400">Term</p>
                    <p className="mt-2 text-2xl font-bold">60 mo</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#5ED1D1]/40 bg-[#5ED1D1]/10 p-5">
                  <p className="text-sm text-slate-300">Estimated Payment</p>
                  <p className="mt-2 text-4xl font-black">$506/mo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tool Modules */}
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {["Personal Loan", "Auto Loan", "Mortgage", "DTI Check"].map((item) => (
              <div
                key={item}
                className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  ✦
                </div>
                <h3 className="text-xl font-bold">{item}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Open an estimate workspace for this planning category.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Right Insights Panel */}
        <aside className="border-l border-white/10 bg-[#061F3A] px-6 py-8">
          <h2 className="text-2xl font-black">Planning Insights</h2>

          <div className="mt-6 space-y-5">
            <div className="rounded-[28px] bg-white/[0.06] p-6">
              <p className="text-sm text-slate-400">Affordability Signal</p>
              <p className="mt-3 text-4xl font-black text-[#5ED1D1]">Good</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Based on the sample payment, this scenario appears manageable.
              </p>
            </div>

            <div className="rounded-[28px] bg-white/[0.06] p-6">
              <p className="text-sm text-slate-400">Estimated DTI Impact</p>
              <div className="mt-4 h-3 rounded-full bg-white/10">
                <div className="h-3 w-[38%] rounded-full bg-[#5ED1D1]" />
              </div>
              <p className="mt-3 text-sm text-slate-400">38% sample ratio</p>
            </div>

            <div className="rounded-[28px] bg-white/[0.06] p-6">
              <p className="text-sm text-slate-400">Reminder</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Estimates are educational only. PREVIEWMYLOAN is not a lender,
                broker, or financial advisor.
              </p>
            </div>

            <button className="w-full rounded-2xl bg-white px-6 py-4 font-bold text-[#04182D] transition hover:bg-slate-200">
              Save This Scenario
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}