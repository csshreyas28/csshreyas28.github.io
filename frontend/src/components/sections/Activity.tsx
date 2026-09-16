"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { profile, social } from "@/content/profile";

const MapView = dynamic(() => import("@/components/bento/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[220px] items-center justify-center bg-white/5 text-sm text-muted">
      Loading map...
    </div>
  ),
});

type PushEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { commits: { message: string }[] };
};

export function Activity() {
  const [totalCommits, setTotalCommits] = useState<number | null>(null);
  const [recentCommits, setRecentCommits] = useState<
    { repo: string; message: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/events/public`,
        );
        const data: unknown = await response.json();
        const events = Array.isArray(data) ? (data as PushEvent[]) : [];
        const pushes = events.filter((event) => event.type === "PushEvent");
        const total = pushes.reduce(
          (sum, event) => sum + (event.payload.commits?.length ?? 0),
          0,
        );
        const recent = pushes.slice(0, 6).flatMap((event) =>
          (event.payload.commits ?? []).map((commit) => ({
            repo: event.repo.name,
            message: commit.message,
          })),
        );

        setTotalCommits(total);
        setRecentCommits(recent.slice(0, 6));
      } catch {
        setTotalCommits(0);
        setRecentCommits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  const hasActivity = !loading && (totalCommits ?? 0) > 0 && recentCommits.length > 0;

  return (
    <section id="activity" className="section-block">
      <div className="section-inner">
        <p className="section-label">Now</p>
        <h2 className="section-title">Activity and location</h2>
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-lg font-medium text-foreground">GitHub</h3>
            {loading ? (
              <p className="mt-4 text-sm text-muted">Loading recent public activity...</p>
            ) : hasActivity ? (
              <>
                <p className="mt-4 text-sm text-muted">
                  <span className="text-foreground">{totalCommits}</span> recent
                  public commits
                </p>
                <ul className="mt-6 space-y-3">
                  {recentCommits.map((commit, index) => (
                    <li
                      key={`${commit.repo}-${index}`}
                      className="border-l border-white/15 pl-4 text-sm text-muted"
                    >
                      <span className="text-foreground/90">{commit.repo}</span>
                      <span className="mx-1.5">·</span>
                      {commit.message.slice(0, 80)}
                      {commit.message.length > 80 ? "..." : ""}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                No recent public pushes to show. See more on{" "}
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:opacity-80"
                >
                  GitHub
                </a>
                .
              </p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground">Based in</h3>
            <p className="mt-2 text-sm text-muted">{profile.location.label}</p>
            <div className="mt-6 overflow-hidden">
              <MapView lat={profile.location.lat} lng={profile.location.lng} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
