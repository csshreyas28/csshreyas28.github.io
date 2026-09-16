"use client";

import { FormEvent, useState } from "react";
import { API_URL, RECAPTCHA_SITE_KEY } from "@/lib/api";

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready: (callback: () => void) => void;
    };
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", message: "All fields are required." });
      return;
    }

    setStatus({ type: "loading", message: "Sending..." });

    try {
      if (!window.grecaptcha?.execute) {
        throw new Error("Verification is still loading. Please try again in a moment.");
      }

      await new Promise<void>((resolve, reject) => {
        window.grecaptcha.ready(resolve);
        setTimeout(reject, 10000, new Error("ReCAPTCHA timed out. Please refresh and try again."));
      });

      const recaptchaResponse = await window.grecaptcha.execute(
        RECAPTCHA_SITE_KEY,
        { action: "submit" }
      );

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, recaptchaResponse }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
          throw new Error(result.errors.map((e: { msg: string }) => e.msg).join(" "));
        }
        throw new Error(result.message ?? "Something went wrong.");
      }

      setStatus({ type: "success", message: "Message sent successfully!" });
      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message.",
      });
    }
  };

  const fieldClass =
    "mt-2 w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-muted">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Your name / company"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-xs uppercase tracking-widest text-muted">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="Your email"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-xs uppercase tracking-widest text-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Your message"
          required
          rows={5}
          className={`${fieldClass} resize-none`}
        />
      </div>
      <button type="submit" disabled={status.type === "loading"} className="btn-primary self-start">
        {status.type === "loading" ? "Sending..." : "Send message"}
      </button>
      {status.message && (
        <p
          className={`text-sm ${
            status.type === "success"
              ? "text-accent"
              : status.type === "error"
                ? "text-red-400"
                : "text-muted"
          }`}
          role="status"
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
