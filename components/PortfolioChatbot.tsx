"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, Mail, MessageCircle, Phone, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const quickPrompts = [
  "What can Hasnain build?",
  "How do I contact him?",
  "Show project experience",
];

const starterMessage =
  "Welcome. I can help with Hasnain's skills, projects, availability, and contact details.";

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
          content: "I could not connect right now. You can contact Hasnain at mhksmm155@gmail.com or +92 304 683 8346.",
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
            className="fixed bottom-24 right-4 z-[68] max-w-[18rem] rounded-lg border border-black/[0.08] bg-[#F6F1EA] p-3 text-left shadow-[0_1.4rem_3.5rem_rgba(17,17,17,0.18)] sm:bottom-24 sm:right-24"
          >
            <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-2.5 py-1 text-[0.68rem] font-bold uppercase text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
            <span className="block text-sm font-semibold leading-5 text-[#111111]">
              Need help reviewing Hasnain&apos;s work or starting a project?
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
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#111111] text-white shadow-[0_1.2rem_3rem_rgba(17,17,17,0.24)] transition hover:bg-[#D6453D] sm:bottom-6 sm:right-6"
        whileHover={{ y: -3, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full border-2 border-[#111111] bg-emerald-500" />
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-24 z-[69] overflow-hidden rounded-lg border border-black/[0.1] bg-[#F6F1EA] shadow-[0_2rem_5rem_rgba(17,17,17,0.22)] sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[27rem]"
          >
            <div className="border-b border-white/10 bg-[#111111] px-4 py-4 text-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#D6453D] shadow-[0_0.8rem_1.8rem_rgba(214,69,61,0.28)]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm font-black uppercase">Hasnain Assistant</h2>
                    <p className="mt-1 text-xs text-white/60">Project guidance and contact support</p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/12 px-2.5 py-1 text-[0.68rem] font-bold uppercase text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Online
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <a href="mailto:mhksmm155@gmail.com" className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-white/85 transition hover:bg-white/15">
                  <Mail className="h-3.5 w-3.5 text-[#D6453D]" />
                  Email
                </a>
                <a href="tel:+923046838346" className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-white/85 transition hover:bg-white/15">
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[88%] rounded-lg px-3 py-2.5 text-sm leading-6 shadow-[0_0.8rem_2rem_rgba(17,17,17,0.05)] ${
                      message.role === "user"
                        ? "ml-auto bg-[#111111] text-white"
                        : "mr-auto border border-black/[0.08] bg-white/75 text-[#333333]"
                    }`}
                  >
                    {message.content}
                  </motion.div>
                ))}
                {loading ? (
                  <div className="mr-auto inline-flex max-w-[88%] items-center gap-2 rounded-lg border border-black/[0.08] bg-white/75 px-3 py-2.5 text-sm text-[#666666]">
                    <Loader2 className="h-4 w-4 animate-spin text-[#D6453D]" />
                    Thinking
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
                    className="rounded-md border border-black/[0.08] bg-white/50 px-2.5 py-1.5 text-xs font-semibold text-[#666666] transition hover:border-[#D6453D] hover:text-[#D6453D]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about skills, projects, or hiring..."
                  className="min-w-0 flex-1 rounded-md border border-black/[0.1] bg-white/65 px-3 py-3 text-sm text-[#111111] outline-none transition focus:border-[#D6453D]"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#111111] text-white transition hover:bg-[#D6453D] disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
