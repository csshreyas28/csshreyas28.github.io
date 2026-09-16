"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { BentoCard } from "@/components/ui/BentoCard";

type PushEvent = {
  type: string;
  repo: { name: string };
  actor: { login: string };
  created_at: string;
  payload: { commits: { message: string }[] };
};

export function GitHubStats() {
  const [totalCommits, setTotalCommits] = useState<number | null>(null);
  const [recentCommits, setRecentCommits] = useState<
    { repo: string; message: string; date: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/events/public`
        );
        const data: PushEvent[] = await response.json();
        const pushes = data.filter((event) => event.type === "PushEvent");
        const total = pushes.reduce(
          (sum, event) => sum + event.payload.commits.length,
          0
        );

        const recent = pushes.slice(0, 6).flatMap((event) =>
          event.payload.commits.map((commit) => ({
            repo: event.repo.name,
            message: commit.message,
            date: new Date(event.created_at).toLocaleDateString(),
          }))
        );

        setTotalCommits(total);
        setRecentCommits(recent.slice(0, 6));
      } catch {
        setTotalCommits(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  return (
    <BentoCard className="h-full">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
        GitHub Activity
      </h3>
      {loading ? (
        <p className="text-sm text-muted">Loading stats...</p>
      ) : (
        <>
          <p className="mb-4 text-2xl font-bold text-accent">
            {totalCommits ?? 0}
            <span className="ml-2 text-sm font-normal text-white/70">
              recent commits
            </span>
          </p>
          <ul className="space-y-2">
            {recentCommits.map((commit, index) => (
              <li
                key={`${commit.repo}-${index}`}
                className="border-l-2 border-accent/40 pl-3 text-xs text-white/70"
              >
                <span className="font-medium text-white/90">{commit.repo}</span>
                <span className="mx-1">·</span>
                {commit.message.slice(0, 60)}
                {commit.message.length > 60 ? "..." : ""}
              </li>
            ))}
          </ul>
        </>
      )}
    </BentoCard>
  );
}
