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

const zones: { id: Exclude<VelocityZone, "idle">; label: string; color: string }[] = [
  { id: "hesitant", label: "hesitant", color: "#a78bfa" },
  { id: "casual", label: "casual", color: "#60a5fa" },
  { id: "decisive", label: "decisive", color: "#f87171" },
];

export default function SwipeVelocity() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentZone, setCurrentZone] = useState<VelocityZone>("idle");
  const [lastOutcome, setLastOutcome] = useState<VelocityZone | null>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 0, 200], [-4, 0, 4]);
  const opacity = useTransform(x, [-240, -120, 0, 120, 240], [0.3, 0.75, 1, 0.75, 0.3]);
  const posRef = useRef<{ x: number; t: number }[]>([]);

  useEffect(() => {
    const unsub = x.on("change", (latest) => {
      const now = performance.now();
      posRef.current.push({ x: latest, t: now });
      posRef.current = posRef.current.filter((p) => p.t >= now - 120);
      const pts = posRef.current;
      if (pts.length >= 2) {
        const dt = pts[pts.length - 1].t - pts[0].t;
        if (dt > 0) {
          const vel = Math.abs(pts[pts.length - 1].x - pts[0].x) / dt;
          setCurrentZone(vel < 0.2 ? "hesitant" : vel < 0.7 ? "casual" : "decisive");
        }
      }
    });
    return () => unsub();
  }, [x]);

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    const absVx = Math.abs(info.velocity.x);
    const absOff = Math.abs(info.offset.x);
    if (absVx > 600 || (absVx > 300 && absOff > 80)) {
      setLastOutcome("decisive");
      x.set((info.offset.x > 0 ? 1 : -1) * 600);
      setTimeout(() => { setIsVisible(false); setCurrentZone("idle"); }, 40);
      return;
    }
    if (absVx > 150 && absOff > 60) {
      setLastOutcome("casual");
      x.set((info.offset.x > 0 ? 1 : -1) * 400);
      setTimeout(() => { setIsVisible(false); setCurrentZone("idle"); }, 80);
      return;
    }
    setLastOutcome("hesitant");
    setCurrentZone("idle");
    posRef.current = [];
  }, [x]);

  useEffect(() => {
    if (!isVisible) {
      const tid = setTimeout(() => {
        x.set(0);
        setIsVisible(true);
        setCurrentZone("idle");
        posRef.current = [];
      }, 800);
      return () => clearTimeout(tid);
    }
  }, [isVisible, x]);

  return (
    <div className="w-full max-w-[800px] mx-auto" aria-label="Velocity-aware swipe demo">
      {/* Card */}
      <div className="relative flex items-center justify-center min-h-[150px] mb-6">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key="vel-card"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ x, rotateZ, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragStart={() => { posRef.current = []; }}
              onDragEnd={handleDragEnd}
              className="w-[320px] rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] p-3.5 select-none cursor-grab active:cursor-grabbing"
              role="group"
              aria-label="Swipe this card at different speeds"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex-1 pt-px">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[13px] font-medium text-stone-900 leading-tight">Swipe this card</p>
                    <span className="text-[11px] text-stone-400 flex-shrink-0">now</span>
                  </div>
                  <p className="text-[12.5px] text-stone-500 leading-snug mt-0.5">
                    Try fast, slow, or hesitant. See what happens.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Velocity indicator */}
      <div className="flex items-center gap-1 max-w-[280px] mx-auto">
        {zones.map((z) => {
          const active = currentZone === z.id;
          return (
            <div key={z.id} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className="w-full h-[3px] rounded-full transition-all duration-150"
                style={{ backgroundColor: active ? z.color : "#e7e5e4" }}
              />
              <span
                className="text-[10px] font-mono transition-colors duration-150"
                style={{ color: active ? z.color : "#c4c0bb" }}
              >
                {z.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Outcome */}
      <AnimatePresence>
        {lastOutcome && !isVisible && (
          <motion.p
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center text-stone-400 text-[11px] mt-5"
          >
            {lastOutcome === "decisive" && "Gone. You meant that."}
            {lastOutcome === "casual" && "Cleared without urgency."}
            {lastOutcome === "hesitant" && "It came back. Maybe you weren't sure."}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
