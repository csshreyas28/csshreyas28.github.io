import Image from "next/image";
import { profile, social } from "@/content/profile";

export function Hero() {
  return (
    <section id="home" className="hero-panel relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:px-8">
        <div>
          <p className="section-label">Software Engineer</p>
          <h1 className="mt-4 font-serif text-3xl leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {profile.intro}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">View projects</a>
            <a href="/resume.pdf" className="btn-secondary">Resume</a>
          </div>
          <div className="mt-8 flex gap-5 text-sm">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="relative w-full max-w-[420px]">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
