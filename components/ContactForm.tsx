"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Send } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";
import { Toast } from "@/components/ui/Toast";

const initialState = {
  ok: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-md border border-[#D6453D] bg-[#D6453D] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B83A33] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending..." : "Send Message"}
      <Send className="h-4 w-4" />
    </button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(sendContactMessage, initialState);

  return (
    <>
      <form action={action} className="grid gap-5 rounded-xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:p-6">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium text-white/75">
            Name
          </label>
          <input
            id="name"
            name="name"
            minLength={2}
            required
            className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-[#D6453D]"
            placeholder="Your name"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-white/75">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-[#D6453D]"
            placeholder="you@example.com"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium text-white/75">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            minLength={10}
            required
            rows={5}
            className="resize-none rounded-md border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-[#D6453D]"
            placeholder="Tell me what you want to build"
          />
        </div>
        <SubmitButton />
      </form>
      <Toast
        message={state.message}
        type={state.ok ? "success" : "error"}
      />
    </>
  );
}
