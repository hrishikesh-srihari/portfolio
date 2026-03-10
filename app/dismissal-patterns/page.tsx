"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import CoreSandbox from "../components/demos/CoreSandbox";
import AgencyCommitmentMatrix from "../components/demos/AgencyCommitmentMatrix";
import ContextCards from "../components/demos/ContextCards";
import SwipeVelocity from "../components/demos/SwipeVelocity";

export default function DismissalPatterns() {
  // Force dark mode on this page
  useEffect(() => {
    const html = document.documentElement;
    const wasDark = html.classList.contains("dark");
    html.classList.add("dark");
    return () => {
      if (!wasDark) {
        html.classList.remove("dark");
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white/[0.85] pb-32">
      {/* Back link */}
      <div className="max-w-[680px] mx-auto px-6 pt-10 md:pt-16">
        <Link
          href="/"
          className="text-white/20 text-[13px] hover:text-white/40 transition-colors inline-flex items-center gap-1.5"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Rishi Srihari
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-[680px] mx-auto px-6 pt-20 md:pt-28">
        {/* Title */}
        <header className="mb-20">
          <h1 className="text-3xl md:text-[40px] leading-[1.15] tracking-[-0.02em] text-white/90 mb-5">
            Dismissal Patterns
          </h1>
          <p className="text-white/35 text-[17px] italic leading-relaxed">
            How the way you close something changes how you feel about it.
          </p>
        </header>

        {/* --- */}
        <Divider />

        {/* Intro */}
        <section className="space-y-7">
          <P>
            Every interaction in UI is designed to pull you in. Hover states,
            loading indicators, button feedback, entrance animations — it's
            all engineered to acknowledge you, reward you, keep you engaged.
            Dismissal is the one interaction that goes the other direction.
            You're done. You're leaving. And almost no one designs for it.
          </P>
          <P>
            That's strange, because dismissal happens constantly. You close
            modals, swipe away notifications, escape out of dialogs, let
            banners time out. It's one of the most frequent things you do in
            any interface. But because it's not about engagement, it rarely
            gets the same intentionality. Most apps pick one method, apply it
            everywhere, and move on.
          </P>
          <P>
            The result is that dismissal usually just... works. But it rarely
            feels right.
          </P>
        </section>

        <Divider />

        {/* Seven ways */}
        <section>
          <H2>Seven ways to close the same thing</H2>
          <div className="space-y-7 mb-14">
            <P>
              Here's a card. A notification, a modal, a banner — doesn't
              matter. There are seven common ways to get rid of it.
            </P>
          </div>
        </section>
      </article>

      {/* Demo 1 — breaks out wider */}
      <div className="max-w-[800px] mx-auto px-6 mb-14">
        <CoreSandbox />
      </div>

      <article className="max-w-[680px] mx-auto px-6">
        <section className="space-y-5 mb-4">
          <BulletItem label="Click X">
            Deliberate. Surgical. You found the button and you used it.
            There's a specificity to this one — you had to mean it.
          </BulletItem>
          <BulletItem label="Click outside">
            Casual, almost accidental. You moved on before you consciously
            decided to. It's the visual equivalent of trailing off
            mid-sentence.
          </BulletItem>
          <BulletItem label="Swipe away">
            Physical. Committed. You threw it. There's directionality here
            that makes it feel final in a way that tapping never quite does.
          </BulletItem>
          <BulletItem label="Press Escape">
            Pure reflex. Your fingers left before your brain caught up. Not a
            decision so much as an exit.
          </BulletItem>
          <BulletItem label="Drag down">
            Slower, more deliberate than a swipe. Like setting something down
            instead of throwing it away. The gravity feels intentional.
          </BulletItem>
          <BulletItem label="Auto-timeout">
            The app decided for you. This one is interesting because you
            didn't do anything — and yet the thing is gone. That can feel
            helpful or it can feel like being managed, depending entirely on
            what was dismissed.
          </BulletItem>
          <BulletItem label="Undo-based">
            Instant dismissal, reversible consequence. The Gmail "message
            sent" pattern. Gone immediately, but with a five-second window
            where it isn't really gone yet. The lightest version of dismissal
            that exists.
          </BulletItem>
        </section>

        <P>
          You probably felt something different doing each of those. Not
          dramatically different — but different. That's the thing worth
          designing around.
        </P>

        <Divider />

        {/* Agency x Commitment */}
        <section>
          <H2>Agency × Commitment</H2>
          <div className="space-y-7 mb-14">
            <P>
              Two questions determine whether you picked the right dismissal
              method.
            </P>
            <P italic>
              Who ended this — the user or the app? That's agency.
            </P>
            <P italic>
              How permanent does it feel? That's commitment.
            </P>
          </div>
        </section>
      </article>

      {/* Demo 2 */}
      <div className="max-w-[800px] mx-auto px-6 mb-14">
        <AgencyCommitmentMatrix />
      </div>

      <article className="max-w-[680px] mx-auto px-6">
        <section className="space-y-7">
          <P>
            Plot them out and the picture gets clear fast. Swipe sits in high
            agency, high commitment — you initiated it and it felt final.
            Click outside is high agency, low commitment — technically you
            chose it but it barely registered as a choice. Auto-timeout is
            low agency, low commitment — neither of you really meant it.
            Undo-based is almost off the chart in the low-commitment
            direction: maximum agency (you hit send), near-zero commitment
            (but not really).
          </P>
          <P>
            Most apps default to click-X or click-outside for everything.
            That's one quadrant. The other three exist for a reason, and the
            content being dismissed usually tells you exactly which one to
            use. A low-stakes notification and a destructive account action
            don't belong in the same quadrant.
          </P>
        </section>

        <Divider />

        {/* Context */}
        <section>
          <H2>Context changes the weight of the gesture</H2>
          <div className="space-y-7 mb-14">
            <P>
              Here's the thing about swipe-to-dismiss: it's a great pattern.
              It's physical, it's satisfying, it maps well to the mental model
              of clearing something away.
            </P>
            <P>
              But swipe away a spam notification and it feels fine. Swipe away
              a message from your mom and it feels slightly wrong. Swipe away
              an unsaved draft warning and it feels genuinely uncomfortable.
            </P>
            <P>
              Same animation. Same velocity. Completely different emotional
              register.
            </P>
          </div>
        </section>
      </article>

      {/* Demo 3 */}
      <div className="max-w-[800px] mx-auto px-6 mb-14">
        <ContextCards />
      </div>

      <article className="max-w-[680px] mx-auto px-6">
        <section className="space-y-7">
          <P>
            This is the thing that makes dismissal hard to design in the
            abstract. The mechanic isn't the full story — the content is half
            of it. A slow, deliberate drag-down might be perfect for clearing
            a shopping cart item and completely inappropriate for clearing a
            year of saved notes. The interaction doesn't carry meaning on its
            own. It borrows meaning from what it's attached to.
          </P>
        </section>

        <Divider />

        {/* Velocity */}
        <section>
          <H2>Velocity is a signal almost no one reads</H2>
          <div className="space-y-7 mb-14">
            <P>
              Fast swipes feel different from slow ones. You've felt this.
              What's strange is that almost no UI responds to it differently.
            </P>
          </div>
        </section>
      </article>

      {/* Demo 4 */}
      <div className="max-w-[800px] mx-auto px-6 mb-14">
        <SwipeVelocity />
      </div>

      <article className="max-w-[680px] mx-auto px-6">
        <section className="space-y-7">
          <P>
            A fast swipe is confident. You know what you want, you're done,
            move on. A slow swipe is something else — hesitation, maybe, or
            second-guessing. "I should probably dismiss this but I'm not
            sure." The mechanical outcome is the same either way, but the
            intent behind them is genuinely different.
          </P>
          <P>
            Velocity-aware dismissal is one of the richest, most underused
            signals in interaction design. A slow swipe probably means "not
            right now." A fast one means "never show me this again." If an
            app actually distinguished between those two states — surfaced
            the content again later for slow-swipers, buried it permanently
            for fast ones — that's a smarter personalization engine than most
            explicit preference settings.
          </P>
          <P>
            The gesture contains the answer. We just don't ask it anything.
          </P>
        </section>

        <Divider />

        {/* Closing */}
        <section className="space-y-7 mb-20">
          <P>
            Dismissal is the interaction that tells users whether you paid
            attention to what they were throwing away. Get the agency and
            commitment right and people will feel like the app understands
            them, even if they can't say why. Get it wrong and you get that
            subtle wrongness — a pattern that technically works and
            emotionally misses.
          </P>
          <P>Most apps get their primary flows right and miss this everywhere else.</P>
        </section>
      </article>
    </main>
  );
}

/* ---------- Typography components ---------- */

function P({
  children,
  italic = false,
}: {
  children: React.ReactNode;
  italic?: boolean;
}) {
  return (
    <p
      className={`text-[16px] md:text-[17px] leading-[1.75] text-white/55 ${
        italic ? "italic text-white/40" : ""
      }`}
    >
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl md:text-[22px] leading-tight text-white/85 tracking-[-0.01em] mb-8">
      {children}
    </h2>
  );
}

function BulletItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-[16px] md:text-[17px] leading-[1.75] text-white/55">
      <span className="text-white/75 font-medium">{label}</span>
      <span className="text-white/20 mx-1.5">—</span>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="my-16 md:my-20 flex justify-center">
      <span className="text-white/15 text-lg tracking-[0.3em]">---</span>
    </div>
  );
}
