"use client";

import { useState, type FormEvent } from "react";
import { strings, type Lang } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({ lang = "en" }: { lang?: Lang }) {
  const t = strings[lang].contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg((lang === "en" && data.error) || t.genericError);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(t.networkError);
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line p-8 text-center">
        <p className="text-lg font-medium">{t.sentTitle}</p>
        <p className="text-muted mt-1 text-sm">
          {t.sentBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t.name} name="name" required />
        <Field label={t.phone} name="phone" type="tel" />
      </div>
      <Field label={t.email} name="email" type="email" required />
      <div>
        <label htmlFor="message" className="label-tag mb-2 block">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full border border-line bg-paper px-3 py-2 text-sm focus:border-ink resize-y"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-kw-red">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
      >
        {status === "loading" ? t.sending : t.send}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-tag mb-2 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border border-line bg-paper px-3 py-2 text-sm focus:border-ink"
      />
    </div>
  );
}
