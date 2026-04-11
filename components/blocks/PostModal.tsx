"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface PostModalData {
  title:      string;
  imageUrl?:  string;
  imageAlt?:  string;
  badge?:     string;
  dateLabel?: string;
  excerpt?:   string;
  body?:      string;
}

interface Props {
  post:    PostModalData | null;
  onClose: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PostModal({ post, onClose }: Props) {
  // ESC to close + lock body scroll while open
  useEffect(() => {
    if (!post) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={post.title}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-stone-900/75 backdrop-blur-sm" />

          {/* Modal card */}
          <motion.div
            className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-xl bg-surface shadow-2xl"
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0,  opacity: 1, scale: 1    }}
            exit={{    y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Stäng"
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md transition-all hover:scale-105 hover:text-stone-900"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Cover image */}
            {post.imageUrl && (
              <div className="relative aspect-16/9 w-full overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt ?? post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                {post.badge && (
                  <div className="absolute top-6 left-6 rounded-sm bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                    {post.badge}
                  </div>
                )}
              </div>
            )}

            {/* Text content */}
            <div className="p-8 md:p-12">
              {post.dateLabel && (
                <p className="font-(family-name:--font-inter) mb-4 text-xs text-outline">
                  {post.dateLabel}
                </p>
              )}

              <h2 className="font-(family-name:--font-manrope) mb-6 text-3xl font-bold leading-tight tracking-tight text-stone-900 md:text-4xl">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="font-(family-name:--font-inter) mb-6 text-lg leading-relaxed text-secondary">
                  {post.excerpt}
                </p>
              )}

              {post.body && (
                <div className="font-(family-name:--font-inter) space-y-4 text-base leading-relaxed text-secondary">
                  {post.body.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
