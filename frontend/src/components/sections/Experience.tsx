import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section id="experience" className="section-block">
      <div className="section-inner">
        <p className="section-label">Experience</p>
        <h2 className="section-title">Where I&apos;ve worked</h2>

        <ol className="mt-14 space-y-0">
          {experience.map((role, index) => (
            <li key={role.id} className="relative grid gap-2 border-l border-white/15 py-8 pl-8 last:pb-0 first:pt-0 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 md:border-l-0 md:pl-0">
              <div
                className="absolute -left-[5px] top-8 h-2.5 w-2.5 rounded-full bg-accent md:hidden"
                aria-hidden
              />
              {index === 0 ? null : (
                <div
                  className="absolute left-0 top-0 hidden h-px w-full bg-white/10 md:block"
                  aria-hidden
                />
              )}
              <p className="text-sm text-muted">{role.dates}</p>
              <div>
                <h3 className="text-xl font-medium text-foreground">
                  {role.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
