"use client";

import React from "react";
import Link from "next/link";
import CoreSandbox from "../components/demos/CoreSandbox";
import AgencyCommitmentMatrix from "../components/demos/AgencyCommitmentMatrix";
import ContextCards from "../components/demos/ContextCards";
import SwipeVelocity from "../components/demos/SwipeVelocity";

export default function DismissalPatterns() {
  return (
    <main className="min-h-screen pb-32">
      {/* Back link */}
      <div className="max-w-[680px] mx-auto px-6 pt-10 md:pt-16">
        <Link
          href="/"
          className="text-black/25 text-[13px] hover:text-black/50 transition-colors inline-flex items-center gap-1.5"
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
          <h1 className="text-3xl md:text-[40px] leading-[1.15] tracking-[-0.02em] text-black/85 mb-5">
            Dismissal Patterns
          </h1>
          <p className="text-black/35 text-[17px] italic leading-relaxed">
            How the way you close something changes how you feel about it.
          </p>
        </header>

        <Divider />

        {/* Intro */}
        <section className="space-y-7">
          <P>
            Every interaction in UI is designed to pull you in. Hover states,
            loading indicators, button feedback, entrance animations — all
            of it engineered to acknowledge you, reward you, keep you engaged.
          </P>
          <P>
            Dismissal goes the other direction. You{"'"}re done. You{"'"}re leaving.
          </P>
          {/* TODO: Add 1-2 personal sentences here about a specific moment
              where you noticed a dismissal felt wrong in something you were
              building or using. e.g. "I noticed this while building [X] —
              I kept swiping away notifications and something felt off but
              I couldn't name it." */}
          <P>
            It{"'"}s one of the most frequent interactions in any interface —
            closing modals, swiping notifications, escaping out of dialogs,
            letting banners fade. But because it{"'"}s not about engagement, it
            rarely gets the same attention. Most apps pick one method, apply
            it everywhere, and move on.
          </P>
          <P>
            The result is that dismissal usually just works. But it rarely{" "}
            <em>feels</em> right.
          </P>
        </section>

        <Divider />

        {/* Seven ways */}
        <section>
          <H2>Seven ways to close the same thing</H2>
          <div className="space-y-7 mb-14">
            <P>
              Here{"'"}s a card. A notification, a modal, a banner — doesn{"'"}t
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
            There{"'"}s a specificity to this one — you had to mean it.
          </BulletItem>
          <BulletItem label="Click outside">
            Casual, almost accidental. You moved on before you consciously
            decided to. The visual equivalent of trailing off mid-sentence.
          </BulletItem>
          <BulletItem label="Swipe away">
            Physical. Committed. You threw it. There{"'"}s directionality here
            that makes it feel final in a way tapping never quite does.
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
            The app decided for you. You didn{"'"}t do anything — and yet the
            thing is gone. That can feel helpful or it can feel like being
            managed, depending entirely on what was dismissed.
          </BulletItem>
          <BulletItem label="Undo-based">
            Instant dismissal, reversible consequence. The Gmail {'"'}message
            sent{'"'} pattern. Gone immediately, but with a five-second window
            where it isn{"'"}t really gone yet. The lightest version of dismissal
            that exists.
          </BulletItem>
        </section>

        <P>
          You probably felt something different doing each of those. Not
          dramatically — but enough.
        </P>

        <Divider />

        {/* Agency x Commitment */}
        <section>
          <H2>Agency × Commitment</H2>
          <div className="space-y-7 mb-14">
            <P>
              Two questions that help figure out which pattern belongs where.
            </P>
            <P italic>
              Who ended this — the user or the app? That{"'"}s agency.
            </P>
            <P italic>
              How permanent does it feel? That{"'"}s commitment.
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
            Plot them and the picture gets clear. Swipe: high agency, high
            commitment — you initiated it and it felt final. Click outside:
            high agency, low commitment — you chose it but it barely
            registered. Auto-timeout: low agency, low commitment — neither
            of you really meant it. Undo-based is the odd one out: maximum
            agency, near-zero commitment.
          </P>
          <P>
            Most apps default to click-X or click-outside for everything.
            That{"'"}s one quadrant. The other three exist for a reason, and the
            content being dismissed usually tells you which one fits. A spam
            notification and a destructive account action don{"'"}t belong in
            the same quadrant.
          </P>
          {/* TODO: Optional 1-2 personal sentences here about your own
              experience choosing dismissal patterns while building Opennote.
              e.g. "When I was building proactive comments at Opennote, I kept
              reaching for click-outside for everything until I realized the
              comment dismissals needed more weight." */}
        </section>

        <Divider />

        {/* Context */}
        <section>
          <H2>Context changes the weight of the gesture</H2>
          <div className="space-y-7 mb-14">
            <P>
              Swipe-to-dismiss is a great pattern. It{"'"}s physical, satisfying,
              maps well to clearing something away.
            </P>
            <P>
              But swipe a spam notification and it feels fine. Swipe a message
              from your mom and it feels slightly wrong. Swipe an unsaved
              draft warning and it feels uncomfortable.
            </P>
            <P>
              Same animation. Same velocity. Completely different weight.
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
            This is what makes dismissal hard to design in the abstract.
            The mechanic isn{"'"}t the full story — the content is half of it.
            A slow drag-down might be perfect for clearing a shopping cart
            item and completely wrong for clearing a year of saved notes.
            The interaction doesn{"'"}t carry meaning on its own. It borrows
            meaning from what it{"'"}s attached to.
          </P>
        </section>

        <Divider />

        {/* Velocity */}
        <section>
          <H2>Velocity is a signal</H2>
          <div className="space-y-7 mb-14">
            <P>
              Fast swipes feel different from slow ones. You{"'"}ve felt this.
              What{"'"}s interesting is how few interfaces respond to that
              difference.
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
            A fast swipe is confident — you know what you want, you{"'"}re done.
            A slow swipe is something else. Hesitation, second-guessing.
            {" "}{'"'}I should probably dismiss this but I{"'"}m not sure.{'"'} The
            mechanical outcome is the same, but the intent behind them is
            different.
          </P>
          {/* TODO: Optional 1-2 personal sentences here about why velocity
              interests you. Could be about building proactive AI suggestions
              where "not now" vs "never" matters, or an observation from your
              own usage patterns. */}
          <P>
            A slow swipe probably means {'"'}not right now.{'"'} A fast one
            means {'"'}stop showing me this.{'"'} If an interface distinguished
            between those two states — surfaced the content again later for
            slow-swipers, buried it for fast ones — that{"'"}s smarter than most
            explicit preference settings.
          </P>
          <P>
            The gesture contains the answer. It just doesn{"'"}t get asked.
          </P>
        </section>

        <Divider />

        {/* Closing */}
        <section className="space-y-7 mb-20">
          <P>
            Dismissal tells users whether you paid attention to what they
            were throwing away. Get the agency and commitment right and
            people feel understood, even if they can{"'"}t say why. Get it
            wrong and you get that subtle off-ness — technically correct,
            emotionally flat.
          </P>
          {/* TODO: Optional personal closing thought that ties back to your
              work or perspective as a builder. Even one sentence. This is
              where the article becomes yours rather than anyone's. */}
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
      className={`text-[16px] md:text-[17px] leading-[1.75] text-black/45 ${
        italic ? "italic text-black/35" : ""
      }`}
    >
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl md:text-[22px] leading-tight text-black/80 tracking-[-0.01em] mb-8">
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
    <div className="text-[16px] md:text-[17px] leading-[1.75] text-black/45">
      <span className="text-black/70 font-medium">{label}</span>
      <span className="text-black/20 mx-1.5">—</span>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="my-16 md:my-20 flex justify-center">
      <span className="text-black/10 text-lg tracking-[0.3em]">---</span>
    </div>
  );
}
