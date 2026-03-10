"use client";

import React, { useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";

type Feeling = "fine" | "slightly-off" | "uncomfortable";

interface CardData {
  id: string;
  title: string;
  body: string;
  style: "spam" | "message" | "warning";
}

const cards: CardData[] = [
  {
    id: "spam",
    title: "Congratulations!",
    body: "You've won a $500 gift card! Tap to claim.",
    style: "spam",
  },
  {
    id: "message",
    title: "Mom",
    body: "Can you call me when you get a chance?",
    style: "message",
  },
  {
    id: "warning",
    title: "Unsaved draft",
    body: "3 pages of notes will be lost.",
    style: "warning",
  },
];

const styleMap = {
  spam: {
    bg: "bg-white/[0.07]",
    border: "border-white/[0.1]",
    titleColor: "text-emerald-400/70",
    bodyColor: "text-white/40",
    accent: "text-emerald-400/40",
  },
  message: {
    bg: "bg-white/[0.05]",
    border: "border-white/[0.08]",
    titleColor: "text-blue-300/70",
    bodyColor: "text-white/50",
    accent: "text-blue-300/30",
  },
  warning: {
    bg: "bg-white/[0.05]",
    border: "border-amber-500/[0.12]",
    titleColor: "text-amber-400/80",
    bodyColor: "text-white/50",
    accent: "text-amber-400/30",
  },
};

function SwipeCard({
  card,
  onDismiss,
}: {
  card: CardData;
  onDismiss: () => void;
}) {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 0, 200], [-6, 0, 6]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 0.8, 1, 0.8, 0.5]);
  const s = styleMap[card.style];

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
      const dir = info.offset.x > 0 ? 1 : -1;
      x.set(dir * 600);
      setTimeout(onDismiss, 50);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 200, transition: { type: "spring", stiffness: 400, damping: 30 } }}
      transition={{ duration: 0.3 }}
      style={{ x, rotateZ, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      className={`${s.bg} border ${s.border} rounded-xl p-4 select-none cursor-grab active:cursor-grabbing w-full`}
      role="listitem"
      aria-label={`${card.title}: ${card.body}. Swipe to dismiss.`}
    >
      {card.style === "spam" && (
        <span className={`text-[10px] font-mono uppercase tracking-wider ${s.accent} block mb-2`}>
          Promoted
        </span>
      )}
      <p className={`text-sm font-medium mb-1 ${s.titleColor}`}>{card.title}</p>
      <p className={`text-[13px] leading-relaxed ${s.bodyColor}`}>{card.body}</p>
      <p className="text-white/15 text-[10px] font-mono mt-3">Swipe to dismiss</p>
    </motion.div>
  );
}

function FeelingPrompt({
  cardId,
  onSelect,
}: {
  cardId: string;
  onSelect: (cardId: string, feeling: Feeling) => void;
}) {
  const feelings: { id: Feeling; label: string }[] = [
    { id: "fine", label: "Fine" },
    { id: "slightly-off", label: "Slightly off" },
    { id: "uncomfortable", label: "Uncomfortable" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="text-center w-full"
    >
      <p className="text-white/30 text-[12px] font-mono mb-3">How did that feel?</p>
      <div className="flex gap-1.5 justify-center">
        {feelings.map((f) => (
          <button
            key={f.id}
            onClick={() => onSelect(cardId, f.id)}
            className="px-3 py-1.5 rounded-md text-[11px] font-mono text-white/35 hover:text-white/60 hover:bg-white/[0.05] transition-all"
          >
            {f.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function ContextCards() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [responses, setResponses] = useState<Record<string, Feeling>>({});
  const [awaitingResponse, setAwaitingResponse] = useState<string | null>(null);

  const handleDismiss = useCallback((id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
    setAwaitingResponse(id);
  }, []);

  const handleFeeling = useCallback((cardId: string, feeling: Feeling) => {
    setResponses((prev) => ({ ...prev, [cardId]: feeling }));
    setAwaitingResponse(null);
  }, []);

  const handleReset = () => {
    setDismissed(new Set());
    setResponses({});
    setAwaitingResponse(null);
  };

  const allDone = cards.every((c) => responses[c.id]);
  const feelingLabels: Record<Feeling, string> = {
    fine: "Fine",
    "slightly-off": "Slightly off",
    uncomfortable: "Uncomfortable",
  };

  return (
    <div className="w-full max-w-[800px] mx-auto" aria-label="Context-dependent dismissal demo">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="flex items-center justify-center min-h-[140px]">
            <AnimatePresence mode="wait">
              {!dismissed.has(card.id) ? (
                <SwipeCard
                  key={`card-${card.id}`}
                  card={card}
                  onDismiss={() => handleDismiss(card.id)}
                />
              ) : awaitingResponse === card.id && !responses[card.id] ? (
                <FeelingPrompt
                  key={`feeling-${card.id}`}
                  cardId={card.id}
                  onSelect={handleFeeling}
                />
              ) : responses[card.id] ? (
                <motion.div
                  key={`result-${card.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="text-white/20 text-[11px] font-mono">
                    {feelingLabels[responses[card.id]]}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex gap-6 items-center text-[12px] font-mono">
              <span className="text-white/20">
                Spam: <span className="text-white/40">{feelingLabels[responses.spam]}</span>
              </span>
              <span className="text-white/10">|</span>
              <span className="text-white/20">
                Mom: <span className="text-white/40">{feelingLabels[responses.message]}</span>
              </span>
              <span className="text-white/10">|</span>
              <span className="text-white/20">
                Warning: <span className="text-white/40">{feelingLabels[responses.warning]}</span>
              </span>
            </div>
            <div className="mt-4">
              <button
                onClick={handleReset}
                className="text-white/20 text-[11px] font-mono hover:text-white/40 transition-colors underline underline-offset-2 decoration-white/10"
              >
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
