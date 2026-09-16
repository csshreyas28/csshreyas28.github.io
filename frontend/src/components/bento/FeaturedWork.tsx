import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProject, projects } from "@/content/projects";
import { BentoCard } from "@/components/ui/BentoCard";

export function FeaturedWork() {
  return (
    <BentoCard className="relative flex h-full flex-col overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-6">
        <h2 className="text-lg font-semibold md:text-xl">Featured Work</h2>
        <Link
          href={featuredProject.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-accent transition hover:opacity-80"
        >
          View Project
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3 p-4 md:grid-cols-2 md:gap-4 md:p-5">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="rounded-2xl bg-white p-4 text-accent-foreground md:p-5">
            <p className="text-sm font-medium leading-snug md:text-base">
              {featuredProject.highlight}
            </p>
          </div>

          <Link
            href={projects[2].githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative min-h-[180px] flex-1 overflow-hidden rounded-2xl bg-accent p-4 md:min-h-[220px]"
          >
            <Image
              src={projects[2].image}
              alt={projects[2].title}
              fill
              className="object-cover opacity-90 transition group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white">
              {projects[2].title}
            </p>
          </Link>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <Link
            href={projects[1].githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative min-h-[140px] overflow-hidden rounded-2xl bg-accent md:min-h-[160px]"
          >
            <Image
              src={projects[1].image}
              alt={projects[1].title}
              fill
              className="object-cover opacity-90 transition group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-4 left-4 text-sm font-semibold text-white">
              {projects[1].title}
            </p>
          </Link>

          <Link
            href={featuredProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 flex-col justify-between rounded-2xl bg-white p-4 text-accent-foreground md:p-5"
          >
            <p className="text-sm font-medium md:text-base">
              {featuredProject.description}
            </p>
            <div className="relative mt-4 h-28 overflow-hidden rounded-xl md:h-32">
              <Image
                src={featuredProject.image}
                alt={featuredProject.title}
                fill
                className="object-cover transition group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </Link>
        </div>
      </div>
    </BentoCard>
  );
}
