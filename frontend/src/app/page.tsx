import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Activity } from "@/components/sections/Activity";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Skills />
        <Activity />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
