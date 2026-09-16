import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { social } from "@/content/profile";
import { BentoCard } from "@/components/ui/BentoCard";

export function SocialBar() {
  return (
    <BentoCard ghost className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="flex items-center gap-4">
        <Link
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-accent transition hover:scale-110"
        >
          <Github className="h-5 w-5" />
        </Link>
        <Link
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-accent transition hover:scale-110"
        >
          <Linkedin className="h-5 w-5" />
        </Link>
        <Link
          href={social.email}
          aria-label="Email"
          className="text-accent transition hover:scale-110"
        >
          <Mail className="h-5 w-5" />
        </Link>
      </div>

      <Link
        href={social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
      >
        Connect
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </BentoCard>
  );
}
