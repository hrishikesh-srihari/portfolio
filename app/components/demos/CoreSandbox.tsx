"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
  type TargetAndTransition,
} from "framer-motion";

type DismissMethod =
  | "click-x"
  | "click-outside"
  | "swipe"
  | "escape"
  | "drag-down"
  | "auto-timeout"
  | "undo";

const methods: { id: DismissMethod; label: string }[] = [
  { id: "click-x", label: "Click X" },
  { id: "click-outside", label: "Click outside" },
  { id: "swipe", label: "Swipe" },
  { id: "escape", label: "Escape" },
  { id: "drag-down", label: "Drag down" },
  { id: "auto-timeout", label: "Timeout" },
  { id: "undo", label: "Undo" },
];

const exitVariants: Record<DismissMethod, TargetAndTransition> = {
  "click-x": { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: "easeOut" } },
  "click-outside": { opacity: 0, scale: 0.98, transition: { duration: 0.18 } },
  swipe: {},
  escape: { opacity: 0, y: -6, transition: { duration: 0.15 } },
  "drag-down": {},
  "auto-timeout": { opacity: 0, transition: { duration: 0.5 } },
  undo: { opacity: 0, scale: 0.96, transition: { duration: 0.12 } },
};

function NotificationCard({
  method,
  onDismiss,
}: {
  method: DismissMethod;
  onDismiss: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 0, 200], [-5, 0, 5]);
  const opacityX = useTransform(x, [-180, -80, 0, 80, 180], [0.4, 0.85, 1, 0.85, 0.4]);
  const scaleY = useTransform(y, [0, 120], [1, 0.97]);
  const opacityY = useTransform(y, [0, 140], [1, 0.5]);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (method !== "auto-timeout") return;
    setProgress(100);
    const start = Date.now();
    const dur = 3000;
    const iv = setInterval(() => {
      const pct = Math.max(0, 100 - ((Date.now() - start) / dur) * 100);
      setProgress(pct);
      if (pct <= 0) { clearInterval(iv); onDismiss(); }
    }, 16);
    return () => clearInterval(iv);
  }, [method, onDismiss]);

  useEffect(() => {
    if (method !== "escape") return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onDismiss(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [method, onDismiss]);

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (method !== "click-outside") return;
    const h = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) onDismiss();
    };
    const tid = setTimeout(() => document.addEventListener("mousedown", h), 100);
    return () => { clearTimeout(tid); document.removeEventListener("mousedown", h); };
  }, [method, onDismiss]);

  const onSwipeEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 400) {
      x.set((info.offset.x > 0 ? 1 : -1) * 500);
      setTimeout(onDismiss, 40);
    }
  };

  const onDragDownEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 90 || info.velocity.y > 350) {
      y.set(400);
      setTimeout(onDismiss, 40);
    }
  };

  const isDrag = method === "swipe" || method === "drag-down";
  const dragDir = method === "swipe" ? "x" as const : method === "drag-down" ? "y" as const : false as const;

  const hints: Partial<Record<DismissMethod, string>> = {
    "click-outside": "Click anywhere outside",
    swipe: "Drag left or right",
    escape: "Press Escape on your keyboard",
    "drag-down": "Drag downward",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={method === "swipe" || method === "drag-down" ? undefined : exitVariants[method]}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={
        method === "swipe"
          ? { x, rotateZ, opacity: opacityX }
          : method === "drag-down"
          ? { y, scale: scaleY, opacity: opacityY }
          : undefined
      }
      drag={isDrag ? dragDir : false}
      dragConstraints={
        method === "swipe" ? { left: 0, right: 0 }
          : method === "drag-down" ? { top: 0, bottom: 180 }
          : undefined
      }
      dragElastic={method === "swipe" ? 0.9 : 0.25}
      onDragEnd={method === "swipe" ? onSwipeEnd : method === "drag-down" ? onDragDownEnd : undefined}
      className={`relative w-[320px] rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] p-3.5 select-none ${
        isDrag ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      role="alert"
      aria-label="Notification card"
    >
      <div className="flex items-start gap-3">
        {/* App icon */}
        <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="flex-1 min-w-0 pt-px">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[13px] font-medium text-stone-900 leading-tight">Weekly Summary</p>
            <span className="text-[11px] text-stone-400 flex-shrink-0">3m ago</span>
          </div>
          <p className="text-[12.5px] text-stone-500 leading-snug mt-0.5">
            12 updates since last Tuesday. Your project is trending up.
          </p>
        </div>

        {method === "click-x" && (
          <button
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
            className="w-6 h-6 rounded-full flex items-center justify-center text-stone-300 hover:text-stone-500 hover:bg-stone-100 transition-colors flex-shrink-0 -mr-0.5 -mt-0.5"
            aria-label="Dismiss"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 2l6 6M8 2l-6 6" />
            </svg>
          </button>
        )}
      </div>

      {method === "auto-timeout" && (
        <div className="mt-2.5 h-[2px] rounded-full bg-stone-100 overflow-hidden">
          <div className="h-full rounded-full bg-blue-400/60 transition-none" style={{ width: `${progress}%` }} />
        </div>
      )}

      {hints[method] && (
        <p className="text-[10.5px] text-stone-400 mt-2.5">
          {hints[method]}
        </p>
      )}
    </motion.div>
  );
}

function UndoToast({ onUndo, onExpire }: { onUndo: () => void; onExpire: () => void }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      const pct = Math.max(0, 100 - ((Date.now() - start) / 4000) * 100);
      setProgress(pct);
      if (pct <= 0) { clearInterval(iv); onExpire(); }
    }, 16);
    return () => clearInterval(iv);
  }, [onExpire]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="relative rounded-lg bg-stone-900 px-4 py-2.5 flex items-center gap-3 shadow-lg"
    >
      <span className="text-stone-300 text-[13px]">Notification dismissed</span>
      <button
        onClick={onUndo}
        className="text-white text-[13px] font-medium hover:text-blue-300 transition-colors"
      >
        Undo
      </button>
      <div className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-white/20 transition-none" style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  );
}

export default function CoreSandbox() {
  const [activeMethod, setActiveMethod] = useState<DismissMethod>("click-x");
  const [isVisible, setIsVisible] = useState(true);
  const [showUndo, setShowUndo] = useState(false);
  const reappearRef = useRef<NodeJS.Timeout | null>(null);

  const handleDismiss = useCallback(() => {
    if (activeMethod === "undo") {
      setIsVisible(false);
      setShowUndo(true);
      return;
    }
    setIsVisible(false);
    reappearRef.current = setTimeout(() => setIsVisible(true), 600);
  }, [activeMethod]);

  const handleUndoExpire = useCallback(() => {
    setShowUndo(false);
    reappearRef.current = setTimeout(() => setIsVisible(true), 600);
  }, []);

  const handleUndo = useCallback(() => {
    setShowUndo(false);
    setIsVisible(true);
  }, []);

  const switchMethod = (m: DismissMethod) => {
    if (reappearRef.current) clearTimeout(reappearRef.current);
    setActiveMethod(m);
    setShowUndo(false);
    setIsVisible(true);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto" aria-label="Interactive dismissal demo">
      {/* Method selector */}
      <div className="flex flex-wrap gap-1 mb-10 justify-center">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => switchMethod(m.id)}
            aria-pressed={activeMethod === m.id}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-mono transition-colors duration-150 ${
              activeMethod === m.id
                ? "bg-stone-900 text-white"
                : "text-stone-500 hover:text-stone-700 hover:bg-stone-100"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Demo area */}
      <div className="relative flex items-center justify-center min-h-[160px]">
        <AnimatePresence mode="wait">
          {isVisible && !showUndo && (
            <NotificationCard
              key={`card-${activeMethod}`}
              method={activeMethod}
              onDismiss={handleDismiss}
            />
          )}
          {showUndo && (
            <UndoToast key="undo" onUndo={handleUndo} onExpire={handleUndoExpire} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
