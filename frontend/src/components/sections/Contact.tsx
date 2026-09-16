import { ContactForm } from "@/components/bento/ContactForm";

export function Contact() {
  return (
    <section id="contact" className="section-block">
      <div className="section-inner grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
        <div>
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let&apos;s work together</h2>
          <p className="section-lead">
            Have a role, a project, a question, or just want to say hi? Send a message and I&apos;ll
            get back to you.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
  