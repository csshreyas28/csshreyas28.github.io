"use client";

import dynamic from "next/dynamic";
import { profile } from "@/content/profile";
import { BentoCard } from "@/components/ui/BentoCard";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[200px] items-center justify-center rounded-2xl bg-white/5 text-sm text-muted">
      Loading map...
    </div>
  ),
});

export function LocationCard() {
  return (
    <BentoCard className="h-full">
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
        I&apos;m from...
      </h3>
      <p className="mb-4 text-lg font-medium">{profile.location.label}</p>
      <MapView lat={profile.location.lat} lng={profile.location.lng} />
    </BentoCard>
  );
}
