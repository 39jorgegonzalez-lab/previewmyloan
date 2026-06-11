"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    const { data, error } = await supabase
      .from("email_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSubmissions(data);
    } else {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-5xl font-bold">
      PREVIEWMYLOAN Admin Dashboard
    </h1>

    <p className="mt-2 text-slate-400">
      View captured loan preview submissions.
    </p>
  </div>

  <button
    onClick={async () => {
      await fetch("/api/logout", {
        method: "POST",
      });

      window.location.href = "/login";
    }}
    className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
  >
    Logout
  </button>
</div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 overflow-x-auto">
        {loading ? (
          <p>Loading submissions...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3">Email</th>
                <th className="p-3">Loan</th>
                <th className="p-3">APR</th>
                <th className="p-3">Term</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-white/5"
                >
                  <td className="p-3">{lead.email}</td>

                  <td className="p-3">
                    ${lead.loan_amount?.toLocaleString()}
                  </td>

                  <td className="p-3">
                    {lead.apr}%
                  </td>

                  <td className="p-3">
                    {lead.term} mo
                  </td>

                  <td className="p-3">
                    ${Number(lead.monthly_payment).toFixed(2)}
                  </td>

                  <td className="p-3">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}