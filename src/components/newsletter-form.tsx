"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage("You're on the list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-kw-red">{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 min-w-0 border border-line bg-paper px-3 py-2 text-sm focus:border-ink"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-ink px-3 py-2 text-sm font-medium hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Join"}
      </button>
      {status === "error" && <p className="sr-only" role="alert">{message}</p>}
    </form>
  );
}
