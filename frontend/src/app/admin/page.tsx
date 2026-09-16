"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";

type Contact = {
  name: string;
  email: string;
  message: string;
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message ?? "Login failed");
      }

      setToken(data.token);
      await fetchContacts(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async (authToken: string) => {
    const response = await fetch(`${API_URL}/api/contact`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    const data = await response.json();

    if (data.success) {
      setContacts(data.contacts);
    } else {
      setError("Failed to fetch contacts");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setContacts([]);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Link href="/" className="text-sm text-accent hover:underline">
            Back to Portfolio
          </Link>
        </div>

        {!token ? (
          <form
            onSubmit={handleLogin}
            className="mx-auto max-w-sm space-y-4 rounded-2xl border border-white/10 bg-card p-6"
          >
            <input
              name="username"
              placeholder="Username"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </form>
        ) : (
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-red-500/90 px-4 py-2 text-sm font-medium text-white"
            >
              Logout
            </button>

            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="p-4 align-top">{contact.name}</td>
                      <td className="p-4 align-top">{contact.email}</td>
                      <td className="p-4 align-top">{contact.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
