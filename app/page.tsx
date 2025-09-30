"use client";

import React, { useState } from "react";
import localFont from "next/font/local";

export const neueHaas = localFont({
  src: "./fonts/NeueHaasGrotesk-Medium.ttf",
  display: "swap",
  preload: true,
  variable: '--font-neue-haas',
});


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
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`block text-left transition-colors ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-black/40 hover:text-black/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8 md:p-16 max-w-3xl">
          {activeTab === "about" && (
            <div className="space-y-8">
              <div className="space-y-6 text-black/50 leading-relaxed">
                <p>
                  19. Co-founder and CEO of{" "}
                  <a href="https://opennote.com" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-black transition-colors">
                    Opennote 
                  </a>
                  {" - "}building the home for your mind's best work. Backed by Y Combinator, Acrew Capital, Paul Graham, and other great partners.

                </p>

                <p>
                  I was previously one of the first engineers on the {" "}
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
                  I'm a full-stack engineer, and enjoy building memorable products with equal parts, pragmatism and craft. Everything I do is built on an obsession with how things work and why they matter.
                </p>

                <p>
                  I'm currently on leave from UC Irvine and have lived in NY, TX, Singapore, and am currently in SF.
                </p>

                <p>
                  In my free time, I run a lot, read about art and philosophy, and watch a lot of TV.
                </p>

                <p>
                  You can find me on{" "}
                  {" "}
                  <a href="https://linkedin.com/in/hrishikesh-srihari" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-black transition-colors">
                    LinkedIn
                  </a>
                  , {" "}
                  <a href="https://x.com/rishi_srihari" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-2 hover:text-black transition-colors">
                    X
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