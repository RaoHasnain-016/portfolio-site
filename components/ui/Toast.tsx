"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

type ToastProps = {
  message: string;
  type: "success" | "error";
};

export function Toast({ message, type }: ToastProps) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          className="fixed bottom-5 right-5 z-[80] flex max-w-sm items-center gap-3 rounded-md border border-black/[0.08] bg-[#F6F1EA] px-4 py-3 text-sm text-[#111111] shadow-2xl"
        >
          {type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          ) : (
            <XCircle className="h-5 w-5 text-[#D6453D]" />
          )}
          <span>{message}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
