export type Project = {
  id: string;
  title: string;
  description: string;
  highlight: string;
  githubUrl: string;
  image: string;
  stack: string[];
  demoUrl?: string;
  accent?: boolean;
};

export const projects: Project[] = [
  {
    id: "visionverse",
    title: "Image Generation Tool",
    description:
      "AI-powered image generation tool that creates unique visuals from input parameters.",
    highlight: "AI-powered creative generation ⚡",
    githubUrl: "https://github.com/csshreyas28/VisionVerse-Image-Generation-Tool",
    image: "/images/imagegeneration.webp",
    stack: [],
    accent: false,
  },
  {
    id: "fraud-detection",
    title: "Credit Card Fraud Detection",
    description:
      "Machine learning pipeline to detect fraudulent credit card transactions with high accuracy.",
    highlight: "ML fraud detection with high accuracy",
    githubUrl: "https://github.com/csshreyas28/credit-card-fraud-detection",
    image: "/images/creditcardfrauddetection.webp",
    stack: [],
    accent: true,
  },
  {
    id: "library-app",
    title: "Library Management App",
    description:
      "Mobile app for book lending, returns, and inventory management.",
    highlight: "End-to-end library operations on mobile",
    githubUrl: "https://github.com/csshreyas28/library-management-app",
    image: "/images/librarymanagementapp.webp",
    stack: [],
    accent: true,
    },
];

// FUTURE PROJECT PLACEHOLDER
// Copy this object, uncomment it, and replace the values when adding a new project.
// The Projects section will automatically render it in the carousel.
//
// {
//   id: "new-project",
//   title: "Project Name",
//   description: "Short description of what the project does.",
//   highlight: "Short highlight or key feature.",
//   githubUrl: "https://github.com/username/repository",
//   image: "/images/project-image.webp",
//   stack: ["Technology 1", "Technology 2"],
//   // demoUrl: "https://your-live-demo.com", // only include if a real demo exists
//   // accent: true, // optional
// }

export const featuredProject = projects[0];
