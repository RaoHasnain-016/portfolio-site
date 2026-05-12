"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mail, Phone, Send, Sparkles, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const quickPrompts = [
  "Which stack is best for AI SaaS?",
  "Suggest stack for dashboard",
  "How do I hire Hasnain?",
];

const starterMessage =
  "Hi, I am Hasnain's AI assistant. Ask me about his CV, projects, hiring, or the best tech stack for your idea.";

function CartoonBot({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`cartoon-bot ${compact ? "cartoon-bot-compact" : ""}`} aria-hidden="true">
      <span className="cartoon-bot-antenna" />
      <span className="cartoon-bot-face">
        <span className="cartoon-bot-eye cartoon-bot-eye-left" />
        <span className="cartoon-bot-eye cartoon-bot-eye-right" />
        <span className="cartoon-bot-smile" />
      </span>
      <span className="cartoon-bot-ear cartoon-bot-ear-left" />
      <span className="cartoon-bot-ear cartoon-bot-ear-right" />
    </span>
  );
}

export function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: starterMessage },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowWelcome(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  async function sendMessage(value: string) {
    const message = value.trim();

    if (!message || loading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: message }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          messages: nextMessages.slice(-8),
        }),
      });
      const result = (await response.json()) as { reply?: string; error?: string };

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: result.reply || result.error || "I could not answer that right now. Please contact Hasnain by email.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "I could not connect right now. You can contact Hasnain at hasnain.devconnect@gmail.com or +92 329 124 8155.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <AnimatePresence>
        {showWelcome && !open ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              setOpen(true);
              setShowWelcome(false);
            }}
            className="fixed bottom-24 right-4 z-[88] max-w-[19rem] rounded-lg border border-black/[0.08] bg-[#F6F1EA] p-3 text-left shadow-[0_1.4rem_3.5rem_rgba(17,17,17,0.18)] sm:bottom-24 sm:right-28"
          >
            <span className="flex items-center gap-3">
              <CartoonBot compact />
              <span>
                <span className="mb-1 inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-2.5 py-1 text-[0.68rem] font-bold uppercase text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
                <span className="block text-sm font-semibold leading-5 text-[#111111]">
                  Need stack advice or project guidance?
                </span>
              </span>
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        onClick={() => {
          setOpen((value) => !value);
          setShowWelcome(false);
        }}
        className="chatbot-launcher fixed bottom-5 right-5 z-[90] flex h-16 min-w-16 items-center justify-center gap-2 rounded-full border border-white/20 bg-[#111111] px-3 text-white shadow-[0_1.2rem_3rem_rgba(17,17,17,0.24)] transition hover:bg-[#D6453D] sm:bottom-6 sm:right-6 sm:min-w-[11.25rem] sm:px-4"
        whileHover={{ y: -3, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full border-2 border-[#111111] bg-emerald-500" />
        {open ? <X className="h-5 w-5" /> : <CartoonBot compact />}
        <span className="hidden text-left text-sm font-black leading-4 sm:inline">
          AI Assistant
          <span className="block text-[0.68rem] font-bold text-white/60">Stack advisor</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-24 z-[89] overflow-hidden rounded-lg border border-black/[0.1] bg-[#F6F1EA] shadow-[0_2rem_5rem_rgba(17,17,17,0.22)] sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[28rem]"
          >
            <div className="relative overflow-hidden border-b border-white/10 bg-[#111111] px-4 py-4 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#D6453D]/25 blur-2xl" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="shrink-0">
                    <CartoonBot />
                  </div>
                  <div className="min-w-0">
                    <h2 className="flex items-center gap-2 text-sm font-black uppercase">
                      Hasnain AI Assistant
                      <Sparkles className="h-4 w-4 text-[#F0B429]" />
                    </h2>
                    <p className="mt-1 text-xs text-white/60">CV, projects, hiring, and stack suggestions</p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/12 px-2.5 py-1 text-[0.68rem] font-bold uppercase text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Online
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <a href="mailto:hasnain.devconnect@gmail.com" className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-white/85 transition hover:bg-white/15">
                  <Mail className="h-3.5 w-3.5 text-[#D6453D]" />
                  Email
                </a>
                <a href="tel:+923291248155" className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-white/85 transition hover:bg-white/15">
                  <Phone className="h-3.5 w-3.5 text-[#D6453D]" />
                  Call
                </a>
              </div>
            </div>

            <div ref={scrollRef} className="max-h-[24rem] min-h-[18rem] overflow-y-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(246,241,234,0))] px-4 py-4 sm:max-h-[28rem]">
              <div className="grid gap-3">
                {messages.map((message, index) => (
                  <motion.div
                    key={`${message.role}-${index}`}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex max-w-[92%] items-end gap-2 ${message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    {message.role === "assistant" ? <CartoonBot compact /> : null}
                    <div
                      className={`chat-bubble max-w-full rounded-lg px-3 py-2.5 text-sm leading-6 shadow-[0_0.8rem_2rem_rgba(17,17,17,0.05)] ${
                        message.role === "user"
                          ? "chat-bubble-user bg-[#111111] text-white"
                          : "chat-bubble-assistant border border-black/[0.08] bg-white/80 text-[#333333]"
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                {loading ? (
                  <div className="mr-auto inline-flex max-w-[88%] items-center gap-2 rounded-lg border border-black/[0.08] bg-white/75 px-3 py-2.5 text-sm text-[#666666]">
                    <CartoonBot compact />
                    <span className="typing-dots" aria-label="Assistant is thinking">
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t border-black/[0.08] px-4 py-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-md border border-black/[0.08] bg-white/50 px-2.5 py-1.5 text-xs font-semibold text-[#666666] transition hover:-translate-y-0.5 hover:border-[#D6453D] hover:text-[#D6453D]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask for stack advice, CV, projects, or hiring..."
                  className="min-w-0 flex-1 rounded-md border border-black/[0.1] bg-white/65 px-3 py-3 text-sm text-[#111111] outline-none transition focus:border-[#D6453D]"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#111111] text-white transition hover:-translate-y-0.5 hover:bg-[#D6453D] disabled:translate-y-0 disabled:opacity-50"
                  aria-label="Send message"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </form>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
