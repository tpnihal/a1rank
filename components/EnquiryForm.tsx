"use client";

import { useState, type FormEvent } from "react";
import { INTERESTS, PACKAGES, SITE } from "@/lib/site";
import { ArrowRight, Check } from "./Icons";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

type Props = {
  /** Package slug to preselect, e.g. from /contact?package=pro */
  defaultPackage?: string;
  /** Website to prefill, e.g. when coming from the audit tool */
  defaultWebsite?: string;
  /** Topic line stored with the enquiry */
  topic?: string;
  idPrefix?: string;
};

export function EnquiryForm({ defaultPackage = "", defaultWebsite = "", topic = "General enquiry", idPrefix = "enq" }: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const id = (name: string) => `${idPrefix}-${name}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      type: "enquiry",
      topic,
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
      package: String(data.get("package") ?? ""),
      interests: data.getAll("interests").map(String),
      message: String(data.get("message") ?? "").trim(),
      hp: String(data.get("fax") ?? ""),
    };

    const next: Record<string, string> = {};
    if (payload.name.length < 2) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) next.email = "Please add a valid email address so we can reply.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`#${id(Object.keys(next)[0])}`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || "Something went wrong sending your enquiry.");
      setStatus({ kind: "sent" });
      form.reset();
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong sending your enquiry." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="rounded-[1.75rem] border border-white/12 bg-a1-coal p-8 md:p-10" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-a1-gradient">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-3xl font-extrabold">Enquiry sent.</h3>
        <p className="mt-3 text-a1-ash">Thank you. The A1 Rank team will get back to you by email.</p>
        <button type="button" className="btn-ghost mt-7" onClick={() => setStatus({ kind: "idle" })}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-[1.75rem] border border-white/12 bg-a1-coal p-6 sm:grid-cols-2 md:p-8">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id("name")} className="text-[0.82rem] font-semibold text-a1-ash">
          Your name <span className="text-a1-coral">*</span>
        </label>
        <input id={id("name")} name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? id("name-err") : undefined} className="field" />
        {errors.name ? (
          <p id={id("name-err")} className="text-[0.82rem] text-[#ff9aa5]">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id("company")} className="text-[0.82rem] font-semibold text-a1-ash">
          Business name
        </label>
        <input id={id("company")} name="company" autoComplete="organization" className="field" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id("email")} className="text-[0.82rem] font-semibold text-a1-ash">
          Email <span className="text-a1-coral">*</span>
        </label>
        <input id={id("email")} name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? id("email-err") : undefined} className="field" />
        {errors.email ? (
          <p id={id("email-err")} className="text-[0.82rem] text-[#ff9aa5]">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id("phone")} className="text-[0.82rem] font-semibold text-a1-ash">
          WhatsApp / phone
        </label>
        <input id={id("phone")} name="phone" type="tel" autoComplete="tel" className="field" />
      </div>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor={id("website")} className="text-[0.82rem] font-semibold text-a1-ash">
          Current website (if you have one)
        </label>
        <input id={id("website")} name="website" inputMode="url" autoCapitalize="none" spellCheck={false} defaultValue={defaultWebsite} placeholder="yourbusiness.ae" className="field" />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-[0.82rem] font-semibold text-a1-ash">Interested in</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((label, i) => (
            <label key={label} className="cursor-pointer">
              <input type="checkbox" name="interests" value={label} id={id(`int-${i}`)} className="peer sr-only" />
              <span className="inline-block rounded-full border border-white/15 px-3.5 py-2 text-[0.86rem] font-semibold transition peer-checked:border-transparent peer-checked:bg-a1-gradient peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-a1-coral hover:border-white/40">
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor={id("package")} className="text-[0.82rem] font-semibold text-a1-ash">
          Package
        </label>
        <select id={id("package")} name="package" defaultValue={defaultPackage} className="field appearance-none">
          <option value="">Not sure yet, recommend one</option>
          {PACKAGES.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name} · {p.from ? "from " : ""}AED {p.price.toLocaleString("en-US")}/month
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor={id("message")} className="text-[0.82rem] font-semibold text-a1-ash">
          Your goals
        </label>
        <textarea id={id("message")} name="message" rows={4} placeholder="For example: more enquiries from Google and Instagram for our clinic." className="field resize-y" />
      </div>

      {/* Honeypot: hidden from people, filled by bots */}
      <div className="hidden" aria-hidden>
        <label>
          Fax
          <input name="fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={sending} className="btn-primary disabled:cursor-wait disabled:opacity-70">
          {sending ? "Sending…" : "Send enquiry"} {!sending ? <ArrowRight /> : null}
        </button>
        <p className="text-[0.8rem] text-a1-stone">No payment needed. We reply by email.</p>
      </div>

      {status.kind === "error" ? (
        <p role="alert" className="rounded-xl bg-a1-coral/15 p-4 text-[0.9rem] text-[#ffd3d8] sm:col-span-2">
          {status.message} You can also email us directly at <span className="select-all font-semibold text-white">{SITE.email}</span>.
        </p>
      ) : null}
    </form>
  );
}
