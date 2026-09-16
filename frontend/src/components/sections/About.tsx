import { bio } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="section-block">
      <div className="section-inner max-w-3xl">
        <p className="section-label">About</p>
        <h2 className="section-title">A bit of context</h2>
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {bio}
        </p>
      </div>
    </section>
  );
}
