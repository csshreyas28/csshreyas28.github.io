import { Code, Database, Server, Cloud, Container, GitBranch, Github, GitCommit, Figma, Layout, Smartphone, Package, TestTube } from "lucide-react";
import { skillCategories } from "@/content/skills";

const iconMap: Record<string, React.ElementType> = {
  // Languages
  Python: Code,
  C: Code,
  "C++": Code,
  Java: Code,
  TypeScript: Code,
  JavaScript: Code,
  // Frontend
  React: GitCommit,
  Angular: Code,
  HTML: Code,
  CSS: Code,
  SCSS: Code,
  Bootstrap: Code,
  // Backend
  "Node.js": Server,
  "Express.js": Server,
  // Data
  MongoDB: Database,
  MySQL: Database,
  // Cloud & DevOps
  AWS: Cloud,
  Kubernetes: Container,
  "CI/CD": GitBranch,
  Git: GitBranch,
  GitHub: Github,
  // Design
  "UI/UX Principles": Layout,
  "Responsive Design": Smartphone,
  "Component Libraries": Package,
  Figma: Figma,
  // Practices
  "Software Testing": TestTube,
  JIRA: Package,
};

const fallbackIcon = Code;

export function Skills() {
  return (
    <section id="skills" className="section-block">
      <div className="section-inner">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="section-label">Skills</p>
            <h2 className="section-title">Tools I work with</h2>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill] ?? fallbackIcon;
                  return (
                    <span
                      key={skill}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-foreground/80 transition-all duration-200 hover:border-accent/40 hover:bg-white/[0.06] hover:text-accent"
                    >
                      <Icon className="h-3.5 w-3.5 text-foreground/40 transition-colors group-hover:text-accent" />
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
