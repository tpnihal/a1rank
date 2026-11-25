"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "./Icons";

export function Newsletter() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email, hp: String(new FormData(form).get("fax") ?? "") }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || "Could not subscribe right now.");
      setState("done");
      setMessage("You're on the list.");
      form.reset();
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Could not subscribe right now.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className="eyebrow text-a1-stone">
        Monthly growth notes
      </label>
      <div className="mt-3 flex rounded-full border border-white/15 bg-white/[0.04] p-1.5 focus-within:border-a1-pink">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.ae"
          className="min-w-0 flex-1 bg-transparent px-4 text-[0.92rem] text-white placeholder:text-a1-stone focus:outline-none"
        />
        <input name="fax" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button type="submit" disabled={state === "sending"} aria-label="Subscribe" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-a1-gradient disabled:opacity-60">
          <ArrowRight />
        </button>
      </div>
      <p role="status" className={`mt-2 min-h-[1.3em] text-[0.82rem] ${state === "error" ? "text-[#ff9aa5]" : "text-a1-ash"}`}>
        {message}
      </p>
    </form>
  );
}
