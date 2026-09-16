import { profile } from "@/content/profile";
import { designSkills, softwareSkills } from "@/content/skills";
import { BentoCard } from "@/components/ui/BentoCard";

export function SkillsCard() {
  return (
    <BentoCard className="flex h-full flex-col gap-6">
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
          Education & Focus
        </h3>
        <p className="text-lg font-medium">{profile.education.institution}</p>
        <p className="text-sm text-muted">{profile.education.degree}</p>
        <p className="mt-1 text-sm text-white/70">{profile.education.detail}</p>
      </section>

      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
          Core Skills
        </h3>
        <p className="text-sm leading-relaxed text-white/80">
          {designSkills.join(" · ")}
        </p>
      </section>

      <section className="flex-1">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
          Software Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {softwareSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </BentoCard>
  );
}
