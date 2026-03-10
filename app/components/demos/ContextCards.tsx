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
  appName: string;
  title: string;
  body: string;
  time: string;
  style: "spam" | "message" | "warning";
}

const cards: CardData[] = [
  {
    id: "spam",
    appName: "Promo",
    title: "Congratulations!",
    body: "You've won a $500 gift card! Tap to claim.",
    time: "now",
    style: "spam",
  },
  {
    id: "message",
    appName: "Messages",
    title: "Mom",
    body: "Can you call me when you get a chance?",
    time: "2m ago",
    style: "message",
  },
  {
    id: "warning",
    appName: "Notes",
    title: "Unsaved draft",
    body: "3 pages of notes will be lost.",
    time: "just now",
    style: "warning",
  },
];

const iconColors = {
  spam: { bg: "from-green-400 to-green-500", iconStroke: "white" },
  message: { bg: "from-blue-500 to-blue-600", iconStroke: "white" },
  warning: { bg: "from-amber-400 to-amber-500", iconStroke: "white" },
};

const icons = {
  spam: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  message: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

function SwipeCard({ card, onDismiss }: { card: CardData; onDismiss: () => void }) {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-180, 0, 180], [-4, 0, 4]);
  const opacity = useTransform(x, [-160, -80, 0, 80, 160], [0.4, 0.85, 1, 0.85, 0.4]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 400) {
      x.set((info.offset.x > 0 ? 1 : -1) * 500);
      setTimeout(onDismiss, 40);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ x, rotateZ, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      className="w-full rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] p-3 select-none cursor-grab active:cursor-grabbing"
      role="listitem"
      aria-label={`${card.title}: ${card.body}. Swipe to dismiss.`}
    >
      <div className="flex items-start gap-2.5">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${iconColors[card.style].bg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
          {icons[card.style]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-1.5">
            <p className="text-[12px] font-medium text-stone-900 leading-tight truncate">{card.appName}</p>
            <span className="text-[10px] text-stone-400 flex-shrink-0">{card.time}</span>
          </div>
          <p className="text-[12px] font-medium text-stone-600 leading-snug mt-px truncate">{card.title}</p>
          <p className="text-[11.5px] text-stone-400 leading-snug mt-px truncate">{card.body}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FeelingPrompt({
  cardId,
  onSelect,
}: {
  cardId: string;
  onSelect: (id: string, f: Feeling) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay: 0.05 }}
      className="text-center w-full py-3"
    >
      <p className="text-[11px] text-stone-400 mb-2.5">How did that feel?</p>
      <div className="flex gap-1 justify-center">
        {([
          { id: "fine" as Feeling, label: "Fine" },
          { id: "slightly-off" as Feeling, label: "Slightly off" },
          { id: "uncomfortable" as Feeling, label: "Uncomfortable" },
        ]).map((f) => (
          <button
            key={f.id}
            onClick={() => onSelect(cardId, f.id)}
            className="px-2.5 py-1 rounded-md text-[11px] text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
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

  const handleFeeling = useCallback((id: string, f: Feeling) => {
    setResponses((prev) => ({ ...prev, [id]: f }));
    setAwaitingResponse(null);
  }, []);

  const handleReset = () => {
    setDismissed(new Set());
    setResponses({});
    setAwaitingResponse(null);
  };

  const allDone = cards.every((c) => responses[c.id]);
  const labels: Record<Feeling, string> = {
    fine: "Fine",
    "slightly-off": "Slightly off",
    uncomfortable: "Uncomfortable",
  };

  return (
    <div className="w-full max-w-[800px] mx-auto" aria-label="Context-dependent dismissal demo">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {cards.map((card) => (
          <div key={card.id} className="flex items-center justify-center min-h-[100px]">
            <AnimatePresence mode="wait">
              {!dismissed.has(card.id) ? (
                <SwipeCard
                  key={`card-${card.id}`}
                  card={card}
                  onDismiss={() => handleDismiss(card.id)}
                />
              ) : awaitingResponse === card.id && !responses[card.id] ? (
                <FeelingPrompt
                  key={`feel-${card.id}`}
                  cardId={card.id}
                  onSelect={handleFeeling}
                />
              ) : responses[card.id] ? (
                <motion.p
                  key={`done-${card.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-stone-300 text-[11px]"
                >
                  {labels[responses[card.id]]}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex flex-wrap gap-x-5 gap-y-1 items-center text-[11px] justify-center">
              <span className="text-stone-400">
                Spam: <span className="text-stone-600">{labels[responses.spam]}</span>
              </span>
              <span className="text-stone-400">
                Mom: <span className="text-stone-600">{labels[responses.message]}</span>
              </span>
              <span className="text-stone-400">
                Warning: <span className="text-stone-600">{labels[responses.warning]}</span>
              </span>
            </div>
            <div className="mt-2.5">
              <button
                onClick={handleReset}
                className="text-stone-400 text-[11px] hover:text-stone-600 transition-colors"
              >
                Try again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
