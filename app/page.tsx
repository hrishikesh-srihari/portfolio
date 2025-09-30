"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import Image from "next/image";

const neueHaas = localFont({
  src: "./fonts/NeueHaasGrotesk-Medium.ttf",
  display: "swap",
  preload: true,
  variable: '--font-neue-haas',
});

const TabButton = ({ tab, isActive, onClick }: { tab: { id: string; label: string }; isActive: boolean; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Create a continuous path that loops around multiple times with variations
  const createMessyCirclePath = () => {
    const centerX = 40;
    const centerY = 17;
    const baseRx = 35;
    const baseRy = 12;

    // Generate 2.5 loops with slight variations in each revolution using smooth curves
    const loops = 2.5;
    const segments = 32; // More segments for smoother curves
    const points = [];

    for (let loop = 0; loop < loops; loop++) {
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        // Add organic variations to radius based on loop and position
        const loopVariation = loop * 0.3; // Each loop slightly different
        const rxVariation = baseRx + (Math.sin(loop * 2.3 + i * 0.3) * 2.2) + loopVariation;
        const ryVariation = baseRy + (Math.cos(loop * 1.8 + i * 0.25) * 1.3) + loopVariation * 0.5;

        const x = centerX + Math.cos(angle) * rxVariation;
        const y = centerY + Math.sin(angle) * ryVariation;

        points.push({ x, y });
      }
    }

    // Build smooth path using quadratic curves
    let path = `M ${points[0].x},${points[0].y}`;

    for (let i = 1; i < points.length - 1; i += 2) {
      const cp = points[i];
      const end = points[i + 1] || points[i];
      path += ` Q ${cp.x},${cp.y} ${end.x},${end.y}`;
    }

    return path;
  };

  const pathLength = 800; // Approximate length for 2.5 loops

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative block text-left transition-colors ${
        isActive ? "text-black" : "text-black/40 hover:text-black/60"
      }`}
    >
      <span className="relative z-10">{tab.label}</span>
      <svg
        className="absolute -left-2 top-1/2 -translate-y-1/2 pointer-events-none"
        width="80"
        height="34"
        viewBox="0 0 80 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={createMessyCirclePath()}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="text-black/30"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: isHovered ? 0 : pathLength,
            transition: "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>
    </button>
  );
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "about" },
    { id: "projects", label: "projects" },
  ];

  return (

      <div className="relative z-10 flex min-h-screen">
        <aside className="w-48 flex-shrink-0 p-8 pt-16">
          <nav className="space-y-3">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8 md:p-16 max-w-3xl relative">
          {activeTab === "about" && (
            <div className="space-y-8 lg:pr-56">
              <div className="absolute -right-12 top-20 hidden lg:block">
                <div className="w-48 h-64 relative">
                  <Image
                    src="/rishi.JPG"
                    alt="Rishi"
                    fill
                    className="object-cover rounded-sm opacity-80"
                    priority
                  />
                </div>
              </div>

              <div className="space-y-6 text-black/50 leading-relaxed">
                <p>
                  19. Co-founder and CEO of{" "}
                  <a href="https://opennote.com" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-black transition-colors">
                    Opennote 
                  </a>
                  {" - "}building the home for your mind's best work. Backed by Y Combinator, Acrew Capital, Paul Graham, and other great partners.

                </p>

                <p>
                  Before this, I was previously one of the first engineers on the {" "}
                  <a href="https://director.ai" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-black transition-colors">
                    Director 
                  </a>
                  {" "}
                  team at {" "}
                  <a href="https://browserbase.com" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-black transition-colors">
                    Browserbase
                  </a>. 
                </p>

                <p>
                  I'm a full-stack engineer, and enjoy building memorable products with equal parts pragmatism and craft. Everything I do stems from an obsession with understanding how things work and why they matter.
                </p>

                <p>
                  I'm currently on leave from UC Irvine. I've lived in NY, TX, Singapore, and am currently in SF.
                </p>

                <p>
                  In my free time, I run a lot, read about art and philosophy, and online shop for things I don't need at all.
                </p>

                <p>
                  You can find me on{" "}
                  {" "}
                  <a href="https://linkedin.com/in/hrishikesh-srihari" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-black transition-colors">
                    LinkedIn
                  </a>
                  , {" "}
                  <a href="https://x.com/rishi_srihari" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-black transition-colors">
                    X (Twitter)
                  </a>
                  ,{" "}
                  <a href="https://instagram.com/rishisrihari" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-black transition-colors">
                    Instagram
                  </a>
                  ,{" "}
                  or{" "}
                  <a href="mailto:rishi@opennote.me" className="underline decoration-1 underline-offset-2 hover:text-black transition-colors">
                    email
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-12">
              <div className="space-y-10">
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-xl">Runway</h3>
                    <a
                      href="https://runway0.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-black/40 hover:text-black transition-colors"
                    >
                      ↗
                    </a>
                  </div>
                  <div className="text-sm text-black/40 mb-3">Vercel for AI models</div>
                  <p className="text-black/50 leading-relaxed">
                    Generate LoRA datasets, train models, and deploy / download the weights. All using natural language. 1M+ views on X and LinkedIn.
                  </p>
                </div>

                <div>
                  <div className="mb-2">
                    <h3 className="text-xl">Sift</h3>
                  </div>
                  <div className="text-sm text-black/40 mb-3">Supercharged semantic search</div>
                  <p className="text-black/50 leading-relaxed">
                    Simultaneously search files in your filesystem, GitHub, Notion, Slack, Discord, and Google Suite using natural language. Supports 200,000+ document base with sub-second search speed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
  );
};

export default Portfolio;