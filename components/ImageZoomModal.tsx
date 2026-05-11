"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ImageZoomModalProps = {
  image: string | null;
  alt: string;
  onClose: () => void;
};

export function ImageZoomModal({ image, alt, onClose }: ImageZoomModalProps) {
  useEffect(() => {
    if (!image) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#111111]/78 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.button
            type="button"
            aria-label="Close image preview"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-md bg-[#F6F1EA] text-[#111111] shadow-lg transition hover:bg-white"
            whileTap={{ scale: 0.96 }}
          >
            <X className="h-5 w-5" />
          </motion.button>
          <motion.img
            src={image}
            alt={alt}
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[86vh] w-full max-w-6xl rounded-xl object-contain shadow-2xl"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
