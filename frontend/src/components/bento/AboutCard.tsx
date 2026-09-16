"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { BentoCard } from "@/components/ui/BentoCard";

export function AboutCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <BentoCard className="h-full">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
        About Me
      </h3>
      <p
        className={`text-sm leading-relaxed text-white/80 md:text-base ${
          expanded ? "" : "line-clamp-5"
        }`}
      >
        {profile.about}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-4 text-sm font-medium text-accent transition hover:opacity-80"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </BentoCard>
  );
}
