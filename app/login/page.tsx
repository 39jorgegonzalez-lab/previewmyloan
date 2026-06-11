"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      window.location.href = "/admin";
    } else {
      alert("Invalid password.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border p-3 mb-4 text-black"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-[#04182D] py-3 font-bold text-white"
        >
          Sign In
        </button>
      </form>
    </main>
  );
}