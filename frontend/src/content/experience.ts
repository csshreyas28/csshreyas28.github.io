export type ExperienceRole = {
  id: string;
  title: string;
  company: string;
  dates: string;
  bullets: string[];
};

export const experience: ExperienceRole[] = [
  {
    id: "ntt-data",
    title: "Developer Trainee",
    company: "NTT DATA",
    dates: "Apr 2025–Sep 2025",
    bullets: [
      "Enterprise/client project work",
      "Sprint-based enhancements and bug fixes",
      "Java, JavaScript, SQL, REST APIs, Git",
      "Exposure to MuleSoft Anypoint",
    ],
  },
  {
    id: "meltwater",
    title: "Solutions Engineer Intern / Full Stack Developer",
    company: "Meltwater",
    dates: "Apr 2024–Jan 2025",
    bullets: [
      "Built/published a custom component library for sentiment chart visualizations",
      "Worked with Angular, Node.js, Express, MongoDB and NPM",
      "Built/internalized data and database services",
      "Built host application integration for custom widgets",
      "Reported dashboard performance improvement",
      "Used Git/GitHub and CI/CD workflows",
    ],
  },
];

// FUTURE EXPERIENCE PLACEHOLDER
// Copy this object, uncomment it, and replace the values when adding another role.
// The Experience section will automatically render it.
//
// {
//   id: "company-role",
//   title: "Role Title",
//   company: "Company Name",
//   dates: "Month Year–Month Year",
//   bullets: [
//     "Responsibility or achievement",
//     "Technology/work area",
//   ],
// }
