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
  { id: "swipe", label: "Swipe away" },
  { id: "escape", label: "Escape" },
  { id: "drag-down", label: "Drag down" },
  { id: "auto-timeout", label: "Auto-timeout" },
  { id: "undo", label: "Undo-based" },
];

const exitVariants: Record<DismissMethod, TargetAndTransition> = {
  "click-x": { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
  "click-outside": { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
  swipe: {}, // handled by drag
  escape: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  "drag-down": {}, // handled by drag
  "auto-timeout": { opacity: 0, transition: { duration: 0.6 } },
  undo: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
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
  const rotateZ = useTransform(x, [-200, 0, 200], [-8, 0, 8]);
  const opacityX = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 0.8, 1, 0.8, 0.5]);
  const scaleY = useTransform(y, [0, 120], [1, 0.95]);
  const opacityY = useTransform(y, [0, 150], [1, 0.5]);
  const [progress, setProgress] = useState(100);

  // Auto-timeout
  useEffect(() => {
    if (method !== "auto-timeout") return;
    setProgress(100);
    const startTime = Date.now();
    const duration = 3000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onDismiss();
      }
    }, 16);
    return () => clearInterval(interval);
  }, [method, onDismiss]);

  // Escape key
  useEffect(() => {
    if (method !== "escape") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [method, onDismiss]);

  // Click outside
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (method !== "click-outside") return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onDismiss();
      }
    };
    // Delay to prevent immediate dismissal
    const tid = setTimeout(() => {
      document.addEventListener("mousedown", handler);
    }, 100);
    return () => {
      clearTimeout(tid);
      document.removeEventListener("mousedown", handler);
    };
  }, [method, onDismiss]);

  const handleSwipeDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 500) {
      const dir = info.offset.x > 0 ? 1 : -1;
      x.set(dir * 600);
      setTimeout(onDismiss, 50);
    }
  };

  const handleDragDownEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 400) {
      y.set(500);
      setTimeout(onDismiss, 50);
    }
  };

  const isDraggable = method === "swipe" || method === "drag-down";
  const dragDirection = method === "swipe" ? "x" : method === "drag-down" ? "y" : false;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        method === "swipe" || method === "drag-down"
          ? undefined
          : exitVariants[method]
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={
        method === "swipe"
          ? { x, rotateZ, opacity: opacityX }
          : method === "drag-down"
          ? { y, scale: scaleY, opacity: opacityY }
          : undefined
      }
      drag={isDraggable ? dragDirection : false}
      dragConstraints={
        method === "swipe"
          ? { left: 0, right: 0 }
          : method === "drag-down"
          ? { top: 0, bottom: 200 }
          : undefined
      }
      dragElastic={method === "swipe" ? 1 : method === "drag-down" ? 0.3 : 0.6}
      onDragEnd={
        method === "swipe"
          ? handleSwipeDragEnd
          : method === "drag-down"
          ? handleDragDownEnd
          : undefined
      }
      className="relative w-[300px] bg-white/[0.06] border border-white/[0.08] rounded-xl p-5 select-none"
      role="alert"
      aria-label="Notification card"
    >
      {method === "click-x" && (
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors rounded-md hover:bg-white/[0.06]"
          aria-label="Dismiss notification"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
      )}

      <div className="pr-6">
        <p className="text-white/80 text-sm font-medium mb-1.5">New notification</p>
        <p className="text-white/40 text-[13px] leading-relaxed">
          Your weekly summary is ready to view. 12 updates since last Tuesday.
        </p>
      </div>

      {method === "auto-timeout" && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-xl">
          <motion.div
            className="h-full bg-white/20"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {method === "swipe" && (
        <p className="text-white/20 text-[11px] font-mono mt-3">
          Drag left or right
        </p>
      )}
      {method === "drag-down" && (
        <p className="text-white/20 text-[11px] font-mono mt-3">
          Drag downward
        </p>
      )}
      {method === "escape" && (
        <p className="text-white/20 text-[11px] font-mono mt-3">
          Press Escape on your keyboard
        </p>
      )}
      {method === "click-outside" && (
        <p className="text-white/20 text-[11px] font-mono mt-3">
          Click anywhere outside this card
        </p>
      )}
      {method === "auto-timeout" && (
        <p className="text-white/20 text-[11px] font-mono mt-3">
          Wait for it...
        </p>
      )}
    </motion.div>
  );
}

function UndoToast({ onUndo, onExpire }: { onUndo: () => void; onExpire: () => void }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 16);
    return () => clearInterval(interval);
  }, [onExpire]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="relative bg-white/[0.06] border border-white/[0.08] rounded-lg px-4 py-3 flex items-center gap-3"
    >
      <span className="text-white/50 text-[13px]">Notification dismissed</span>
      <button
        onClick={onUndo}
        className="text-white/80 text-[13px] font-medium hover:text-white transition-colors underline decoration-white/30 underline-offset-2"
      >
        Undo
      </button>
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden rounded-b-lg">
        <div
          className="h-full bg-white/15 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}

export default function CoreSandbox() {
  const [activeMethod, setActiveMethod] = useState<DismissMethod>("click-x");
  const [isVisible, setIsVisible] = useState(true);
  const [showUndo, setShowUndo] = useState(false);
  const reappearTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDismiss = useCallback(() => {
    if (activeMethod === "undo") {
      setIsVisible(false);
      setShowUndo(true);
      return;
    }
    setIsVisible(false);
    reappearTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 600);
  }, [activeMethod]);

  const handleUndoExpire = useCallback(() => {
    setShowUndo(false);
    reappearTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 600);
  }, []);

  const handleUndo = useCallback(() => {
    setShowUndo(false);
    setIsVisible(true);
  }, []);

  const switchMethod = (method: DismissMethod) => {
    if (reappearTimeoutRef.current) {
      clearTimeout(reappearTimeoutRef.current);
    }
    setActiveMethod(method);
    setShowUndo(false);
    setIsVisible(true);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto" aria-label="Interactive dismissal demo">
      {/* Method selector */}
      <div className="flex flex-wrap gap-1.5 mb-10 justify-center">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => switchMethod(m.id)}
            aria-pressed={activeMethod === m.id}
            className={`px-3 py-1.5 rounded-md text-[12px] font-mono transition-all duration-200 ${
              activeMethod === m.id
                ? "bg-white/[0.1] text-white/90"
                : "text-white/30 hover:text-white/50 hover:bg-white/[0.04]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Demo area */}
      <div className="relative flex items-center justify-center min-h-[200px]">
        <AnimatePresence mode="wait">
          {isVisible && !showUndo && (
            <NotificationCard
              key={`card-${activeMethod}`}
              method={activeMethod}
              onDismiss={handleDismiss}
            />
          )}
          {showUndo && (
            <UndoToast
              key="undo-toast"
              onUndo={handleUndo}
              onExpire={handleUndoExpire}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
