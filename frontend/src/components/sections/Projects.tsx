"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";

export function Projects() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let lastTime = performance.now();
    const AUTO_SCROLL_SPEED = 2.0; // px per frame at 60fps

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!paused && !hasInteracted) {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        if (maxScroll > 0) {
          carousel.scrollLeft += (AUTO_SCROLL_SPEED * delta) / 16.67;
          if (carousel.scrollLeft >= maxScroll) {
            carousel.scrollLeft = 0;
          }
        }
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [paused, hasInteracted]);

  const goTo = (direction: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const card = carousel.querySelector<HTMLElement>("[data-project-card]");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
    const scrollBy = card.offsetWidth + gap;
    carousel.scrollBy({ left: scrollBy * direction, behavior: "smooth" });
    setHasInteracted(true);
  };

  return (
    <section id="projects" className="section-block">
      <div className="section-inner">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="section-label">Projects</p>
            <h2 className="section-title">Selected work</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous projects"
              onClick={() => goTo(-1)}
              className="rounded-full border border-white/15 p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next projects"
              onClick={() => goTo(1)}
              className="rounded-full border border-white/15 p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="mt-10 overflow-x-auto pb-2 pt-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
        >
          <div className="flex w-max gap-5 md:gap-6">
            {projects.map((project) => (
              <article
                key={project.id}
                data-project-card
                className="scroll-mt-4 flex w-[min(78vw,300px)] flex-col overflow-hidden border border-white/10 bg-card transition-colors duration-300 hover:border-accent/50 md:w-[33%] lg:w-[29%]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 78vw, (max-width: 1200px) 33vw, 29vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <h3 className="font-serif text-lg leading-tight tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  {project.stack.length > 0 ? (
                    <p className="mt-auto text-xs text-foreground/70">
                      {project.stack.join(" · ")}
                    </p>
                  ) : null}
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-accent transition-opacity hover:opacity-80"
                    >
                      GitHub
                      <ArrowRight className="h-3 w-3" />
                    </a>
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-accent transition-opacity hover:opacity-80"
                      >
                        Live demo
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
