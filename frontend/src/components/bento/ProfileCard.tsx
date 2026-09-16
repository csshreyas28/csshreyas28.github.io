"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { profile } from "@/content/profile";
import { BentoCard } from "@/components/ui/BentoCard";

export function ProfileCard() {
  return (
    <div className="flex flex-col gap-0">
      <BentoCard className="relative overflow-hidden rounded-b-none pb-0">
        <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl">
          <Image
            src={profile.photo}
            alt={profile.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 280px, 320px"
          />
          <Sparkles className="sparkle absolute right-3 top-3 h-5 w-5 text-white/80" />
          <Sparkles className="sparkle absolute bottom-4 left-4 h-4 w-4 text-white/60 [animation-delay:0.8s]" />
          <Sparkles className="sparkle absolute left-6 top-8 h-3 w-3 text-white/50 [animation-delay:1.2s]" />
        </div>
      </BentoCard>

      <BentoCard accent className="-mt-2 rounded-t-[1.25rem] pt-6">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          {profile.greeting}
        </h2>
        <p className="mt-2 text-sm leading-relaxed opacity-80 md:text-base">
          &ldquo;{profile.tagline}&rdquo;
        </p>
      </BentoCard>
    </div>
  );
}
