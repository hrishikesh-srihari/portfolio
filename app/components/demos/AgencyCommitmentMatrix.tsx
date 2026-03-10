"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface PatternDot {
  id: string;
  label: string;
  x: number; // 0-100 (left = system, right = user)
  y: number; // 0-100 (bottom = low, top = high)
  color: string;
}

const patterns: PatternDot[] = [
  { id: "click-x", label: "Click X", x: 75, y: 52, color: "rgb(147, 177, 214)" },
  { id: "click-outside", label: "Click outside", x: 70, y: 24, color: "rgb(169, 214, 147)" },
  { id: "swipe", label: "Swipe", x: 82, y: 80, color: "rgb(214, 165, 147)" },
  { id: "escape", label: "Escape", x: 63, y: 18, color: "rgb(196, 169, 214)" },
  { id: "drag-down", label: "Drag down", x: 76, y: 66, color: "rgb(214, 200, 147)" },
  { id: "auto-timeout", label: "Auto-timeout", x: 18, y: 20, color: "rgb(147, 214, 196)" },
  { id: "undo", label: "Undo-based", x: 72, y: 8, color: "rgb(214, 147, 180)" },
];

export default function AgencyCommitmentMatrix() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const padding = { top: 32, right: 24, bottom: 44, left: 64 };
  const width = 680;
  const height = 400;
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  return (
    <div className="w-full max-w-[740px] mx-auto" aria-label="Agency versus commitment matrix showing seven dismissal patterns">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label="2 by 2 matrix plotting dismissal patterns by agency and commitment"
      >
        {/* Grid background lines */}
        {[0.25, 0.5, 0.75].map((frac) => (
          <React.Fragment key={`grid-${frac}`}>
            <line
              x1={padding.left + innerW * frac}
              y1={padding.top}
              x2={padding.left + innerW * frac}
              y2={padding.top + innerH}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
            <line
              x1={padding.left}
              y1={padding.top + innerH * frac}
              x2={padding.left + innerW}
              y2={padding.top + innerH * frac}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          </React.Fragment>
        ))}

        {/* Border */}
        <rect
          x={padding.left}
          y={padding.top}
          width={innerW}
          height={innerH}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />

        {/* X-axis labels */}
        <text
          x={padding.left}
          y={height - 6}
          fill="rgba(255,255,255,0.25)"
          fontSize="11"
          fontFamily="var(--font-geist-mono)"
          textAnchor="start"
        >
          System initiated
        </text>
        <text
          x={padding.left + innerW}
          y={height - 6}
          fill="rgba(255,255,255,0.25)"
          fontSize="11"
          fontFamily="var(--font-geist-mono)"
          textAnchor="end"
        >
          User initiated
        </text>

        {/* Y-axis labels */}
        <text
          x={0}
          y={0}
          fill="rgba(255,255,255,0.25)"
          fontSize="11"
          fontFamily="var(--font-geist-mono)"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`translate(${padding.left - 20}, ${padding.top + innerH - 20}) rotate(-90)`}
        >
          Low commitment
        </text>
        <text
          x={0}
          y={0}
          fill="rgba(255,255,255,0.25)"
          fontSize="11"
          fontFamily="var(--font-geist-mono)"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`translate(${padding.left - 20}, ${padding.top + 20}) rotate(-90)`}
        >
          High commitment
        </text>

        {/* Pattern dots */}
        {patterns.map((p) => {
          const cx = padding.left + (p.x / 100) * innerW;
          const cy = padding.top + ((100 - p.y) / 100) * innerH;
          const isHovered = hoveredId === p.id;
          return (
            <g
              key={p.id}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: "default" }}
            >
              {/* Hover area */}
              <circle cx={cx} cy={cy} r="20" fill="transparent" />
              {/* Dot */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={isHovered ? 6 : 4.5}
                fill={p.color}
                opacity={isHovered ? 0.9 : 0.55}
                animate={{
                  r: isHovered ? 6 : 4.5,
                  opacity: isHovered ? 0.9 : 0.55,
                }}
                transition={{ duration: 0.2 }}
              />
              {/* Label */}
              <motion.text
                x={cx}
                y={cy - 12}
                fill={p.color}
                fontSize="11"
                fontFamily="var(--font-geist-mono)"
                textAnchor="middle"
                opacity={isHovered ? 0.95 : 0.45}
                animate={{ opacity: isHovered ? 0.95 : 0.45 }}
                transition={{ duration: 0.2 }}
              >
                {p.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
