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
        <Hello />
        <GitHub />
        <LinkedIn />
        <AboutCard />
        <Contact />
        <GitHubStats />
        <Skills />
        <Location />
        <Projects />
      
      </div>
    </main>
  )
}
