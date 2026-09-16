export const skillCategories = [
  {
    name: "Languages",
    skills: ["Python", "C", "C++", "Java", "TypeScript", "JavaScript"],
  },
  {
    name: "Frontend",
    skills: ["React", "Angular", "HTML", "CSS", "SCSS", "Bootstrap"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js"],
  },
  {
    name: "Data",
    skills: ["MongoDB", "MySQL"],
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS", "Kubernetes", "CI/CD", "Git", "GitHub"],
  },
  {
    name: "Design",
    skills: [
      "UI/UX Principles",
      "Responsive Design",
      "Component Libraries",
      "Figma",
    ],
  },
  {
    name: "Practices",
    skills: ["Software Testing", "JIRA"],
  },
] as const;

export const designSkills = skillCategories.find(
  (category) => category.name === "Design",
)!.skills;

export const softwareSkills = skillCategories
  .filter((category) => category.name !== "Design")
  .flatMap((category) => category.skills);
