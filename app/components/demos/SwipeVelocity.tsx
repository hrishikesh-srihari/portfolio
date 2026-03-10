"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";

type VelocityZone = "idle" | "hesitant" | "casual" | "decisive";

const zoneColors: Record<VelocityZone, string> = {
  idle: "rgba(255,255,255,0.08)",
  hesitant: "rgba(196,169,214,0.5)",
  casual: "rgba(147,177,214,0.5)",
  decisive: "rgba(214,165,147,0.6)",
};

const zoneLabels: Record<VelocityZone, string> = {
  idle: "",
  hesitant: "hesitant",
  casual: "casual",
  decisive: "decisive",
};

export default function SwipeVelocity() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentZone, setCurrentZone] = useState<VelocityZone>("idle");
  const [lastOutcome, setLastOutcome] = useState<VelocityZone | null>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 0, 200], [-5, 0, 5]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0.3, 0.7, 1, 0.7, 0.3]);

  const positionsRef = useRef<{ x: number; t: number }[]>([]);

  // Track velocity during drag
  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      const now = performance.now();
      positionsRef.current.push({ x: latest, t: now });
      // Keep only last 120ms of data
      const cutoff = now - 120;
      positionsRef.current = positionsRef.current.filter((p) => p.t >= cutoff);

      // Calculate velocity
      const pts = positionsRef.current;
      if (pts.length >= 2) {
        const first = pts[0];
        const last = pts[pts.length - 1];
        const dt = last.t - first.t;
        if (dt > 0) {
          const vel = Math.abs(last.x - first.x) / dt; // px/ms
          if (vel < 0.2) {
            setCurrentZone("hesitant");
          } else if (vel < 0.7) {
            setCurrentZone("casual");
          } else {
            setCurrentZone("decisive");
          }
        }
      }
    });
    return () => unsubscribe();
  }, [x]);

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    const absVx = Math.abs(info.velocity.x);
    const absOffset = Math.abs(info.offset.x);

    // Decisive: fast swipe
    if (absVx > 600 || (absVx > 300 && absOffset > 80)) {
      const dir = info.offset.x > 0 ? 1 : -1;
      setLastOutcome("decisive");
      x.set(dir * 700);
      setTimeout(() => {
        setIsVisible(false);
        setCurrentZone("idle");
      }, 50);
      return;
    }

    // Casual: moderate swipe
    if (absVx > 150 && absOffset > 60) {
      const dir = info.offset.x > 0 ? 1 : -1;
      setLastOutcome("casual");
      x.set(dir * 500);
      setTimeout(() => {
        setIsVisible(false);
        setCurrentZone("idle");
      }, 100);
      return;
    }

    // Hesitant: rubber-band back
    setLastOutcome("hesitant");
    setCurrentZone("idle");
    positionsRef.current = [];
  }, [x]);

  const handleDragStart = () => {
    positionsRef.current = [];
  };

  // Re-appear after dismissal
  useEffect(() => {
    if (!isVisible) {
      const tid = setTimeout(() => {
        x.set(0);
        setIsVisible(true);
        setCurrentZone("idle");
        positionsRef.current = [];
      }, 800);
      return () => clearTimeout(tid);
    }
  }, [isVisible, x]);

  return (
    <div className="w-full max-w-[800px] mx-auto" aria-label="Velocity-aware swipe dismissal demo">
      {/* Card area */}
      <div className="relative flex items-center justify-center min-h-[200px] mb-8">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key="velocity-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                lastOutcome === "decisive"
                  ? {
                      opacity: 0,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      },
                    }
                  : lastOutcome === "casual"
                  ? {
                      opacity: 0,
                      transition: { duration: 0.4, ease: "easeOut" },
                    }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              style={{ x, rotateZ, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="w-[300px] bg-white/[0.06] border border-white/[0.08] rounded-xl p-5 select-none cursor-grab active:cursor-grabbing"
              role="group"
              aria-label="Swipe this card at different speeds"
            >
              <p className="text-white/80 text-sm font-medium mb-1.5">Swipe this card</p>
              <p className="text-white/40 text-[13px] leading-relaxed">
                Try different speeds. Fast, slow, hesitant.
              </p>
              <p className="text-white/15 text-[10px] font-mono mt-3">
                Drag left or right
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Velocity indicator */}
      <div className="flex items-center justify-center gap-1 max-w-[300px] mx-auto">
        {(["hesitant", "casual", "decisive"] as VelocityZone[]).map((zone) => {
          const isActive = currentZone === zone;
          return (
            <div key={zone} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full h-[3px] rounded-full transition-all duration-150"
                style={{
                  backgroundColor: isActive
                    ? zoneColors[zone]
                    : "rgba(255,255,255,0.06)",
                }}
              />
              <span
                className={`text-[10px] font-mono transition-all duration-150 ${
                  isActive ? "text-white/50" : "text-white/15"
                }`}
              >
                {zoneLabels[zone]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Last outcome */}
      <AnimatePresence>
        {lastOutcome && !isVisible && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center text-white/25 text-[11px] font-mono mt-6"
          >
            {lastOutcome === "decisive" && "Decisive. That one's gone for good."}
            {lastOutcome === "casual" && "Casual. Cleared, but without urgency."}
            {lastOutcome === "hesitant" && "Hesitant. It came back — maybe you weren't sure."}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
