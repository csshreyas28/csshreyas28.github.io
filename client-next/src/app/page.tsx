import Hello from "./components/Hello"
import GitHub from "./components/GitHub"
import LinkedIn from "./components/LinkedIn"
import AboutCard from "./components/AboutCard"
import Skills from "./components/Skills"
import Location from "./components/Location"
import Projects from "./components/Projects"
import GitHubStats from "./components/GitHubStats"
import Contact from "./components/Contact"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-900 dark:to-black p-4">
      <div className="bento-grid">

        {/* Top Greeting */}
        <div className="col-span-1 lg:col-span-2 glass-card min-h-[150px]">
          <Hello />
        </div>

        {/* Socials */}
        <div className="col-span-1 lg:col-span-1 glass-card">
          <GitHub />
        </div>
        <div className="col-span-1 lg:col-span-1 glass-card">
          <LinkedIn />
        </div>

        {/* About (wide card) */}
        <div className="col-span-1 lg:col-span-2 glass-card">
          <AboutCard />
        </div>

        {/* Skills (wide card) */}
        <div className="col-span-1 lg:col-span-2 glass-card">
          <Skills />
        </div>

        {/* GitHub Stats */}
        <div className="glass-card">
          <GitHubStats />
        </div>

        {/* Location */}
        <div className="glass-card">
          <Location />
        </div>

        {/* Contact (wide card) */}
        <div className="col-span-1 lg:col-span-2 glass-card">
          <Contact />
        </div>

        {/* Projects (full width) */}
        <div className="col-span-1 lg:col-span-4 glass-card min-h-[10px]">
          <Projects />
        </div>

      </div>
    </main>
  )
}
