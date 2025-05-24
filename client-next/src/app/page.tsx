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
    <main>
      <div>

        {/* Top Greeting */}
        <div>
          <Hello />
        </div>

        {/* Socials */}
        <div>
          <GitHub />
        </div>
        <div>
          <LinkedIn />
        </div>

        {/* About */}
        <div>
          <AboutCard />
        </div>

        {/* Skills */}
        <div>
          <Skills />
        </div>

        {/* GitHub Stats */}
        <div>
          <GitHubStats />
        </div>

        {/* Location */}
        <div>
          <Location />
        </div>

        {/* Contact */}
        <div>
          <Contact />
        </div>

        {/* Projects */}
        <div>
          <Projects />
        </div>

      </div>
    </main>
  )
}
