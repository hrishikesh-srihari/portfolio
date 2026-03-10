"use client";

import React, { useState } from "react";

interface Pattern {
  id: string;
  label: string;
  x: number; // 0–1, agency: 0 = system initiated, 1 = user initiated
  y: number; // 0–1, commitment: 0 = low, 1 = high
  color: string;
  labelSide: "left" | "right";
}

const patterns: Pattern[] = [
  { id: "auto-timeout", label: "Timeout", x: 0.15, y: 0.18, color: "#2563eb", labelSide: "right" },
  { id: "undo", label: "Undo", x: 0.72, y: 0.08, color: "#16a34a", labelSide: "right" },
  { id: "escape", label: "Escape", x: 0.60, y: 0.17, color: "#78716c", labelSide: "left" },
  { id: "click-outside", label: "Click outside", x: 0.70, y: 0.26, color: "#78716c", labelSide: "right" },
  { id: "click-x", label: "Click X", x: 0.75, y: 0.50, color: "#78716c", labelSide: "right" },
  { id: "drag-down", label: "Drag down", x: 0.76, y: 0.66, color: "#7c3aed", labelSide: "left" },
  { id: "swipe", label: "Swipe", x: 0.83, y: 0.82, color: "#dc2626", labelSide: "right" },
];

export default function AgencyCommitmentMatrix() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[680px] mx-auto" aria-label="Agency versus commitment matrix">
      {/* Chart container */}
      <div className="flex">
        {/* Y-axis label */}
        <div className="flex flex-col justify-between items-end pr-3 py-1 flex-shrink-0">
          <span className="text-[10.5px] text-stone-400">High</span>
          <span
            className="text-[10px] text-stone-300 tracking-wider hidden md:block"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            commitment
          </span>
          <span className="text-[10.5px] text-stone-400">Low</span>
        </div>

        {/* Grid */}
        <div
          className="relative flex-1 rounded-lg overflow-hidden"
          style={{
            aspectRatio: "5 / 3",
            backgroundColor: "#fafaf9",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* Grid lines — 4×4 */}
          {[0.25, 0.5, 0.75].map((frac) => (
            <React.Fragment key={frac}>
              {/* Horizontal */}
              <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{ bottom: `${frac * 100}%`, height: 1, backgroundColor: frac === 0.5 ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.035)" }}
              />
              {/* Vertical */}
              <div
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{ left: `${frac * 100}%`, width: 1, backgroundColor: frac === 0.5 ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.035)" }}
              />
            </React.Fragment>
          ))}

          {/* Dots */}
          {patterns.map((p) => {
            const hovered = hoveredId === p.id;

            return (
              <div
                key={p.id}
                className="absolute"
                style={{
                  left: `${p.x * 100}%`,
                  bottom: `${p.y * 100}%`,
                  transform: "translate(-50%, 50%)",
                  zIndex: hovered ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative flex items-center justify-center w-5 h-5 cursor-default">
                  {/* Dot */}
                  <div
                    className="rounded-full transition-all duration-150"
                    style={{
                      width: hovered ? 11 : 7,
                      height: hovered ? 11 : 7,
                      backgroundColor: p.color,
                      opacity: hovered ? 1 : 0.5,
                    }}
                  />
                  {/* Label — always visible */}
                  <span
                    className="absolute whitespace-nowrap pointer-events-none transition-all duration-150"
                    style={{
                      fontSize: hovered ? "11.5px" : "10px",
                      color: p.color,
                      opacity: hovered ? 1 : 0.6,
                      ...(p.labelSide === "right"
                        ? { left: "calc(100% + 3px)", top: "50%", transform: "translateY(-50%)" }
                        : { right: "calc(100% + 3px)", top: "50%", transform: "translateY(-50%)" }),
                    }}
                  >
                    {p.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* X-axis label */}
      <div className="flex items-center justify-between mt-3 pl-10 md:pl-14">
        <span className="text-[10.5px] text-stone-400">System initiated</span>
        <span className="text-[10.5px] text-stone-400">User initiated</span>
      </div>
    </div>
  );
}
