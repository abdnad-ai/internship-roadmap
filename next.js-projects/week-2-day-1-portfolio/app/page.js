const projects = [
{
code: "P1",
title: "AI Developer Assistant",
type: "Frontend",
status: "Live",
description:
"Responsive landing page built with Next.js and Tailwind CSS for AI-assisted developer workflows.",
tech: ["Next.js", "Tailwind", "JavaScript"],
},
{
code: "P2",
title: "Developer Prompt Library",
type: "AI Workflow",
status: "Documented",
description:
"A categorized library of 100 practical prompts for development, debugging, testing, and documentation.",
tech: ["AI Prompting", "Markdown", "GitHub"],
},
{
code: "P3",
title: "Git Workflow Practice",
type: "Version Control",
status: "Completed",
description:
"Practical workflow covering branches, commits, pull requests, merge conflicts, and clean collaboration.",
tech: ["Git", "GitHub", "Reports"],
},
];

const skills = [
"Next.js App Router",
"NestJS Basics",
"JavaScript",
"Tailwind CSS",
"GitHub Workflow",
"PostgreSQL",
"AI Prompting",
"Code Review",
];

const learningPath = [
"Repository setup and daily reporting workflow",
"Git branches, pull requests, and conflict resolution",
"AI prompting and developer prompt library",
"Responsive landing page with manual cleanup",
"Next.js App Router and NestJS fundamentals",
];

export default function Home() {
return ( <main className="relative min-h-screen overflow-hidden bg-[#02070d] text-white"> <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.12),transparent_30%),linear-gradient(120deg,transparent,rgba(20,184,166,0.08),transparent)]" /> <div className="pointer-events-none absolute left-20 top-10 h-px w-[70%] rotate-12 bg-cyan-400/20" /> <div className="pointer-events-none absolute right-20 top-52 h-px w-[45%] -rotate-12 bg-emerald-400/20" /> <div className="pointer-events-none absolute bottom-20 left-10 h-px w-[55%] -rotate-12 bg-cyan-400/10" />

```
  <section className="relative mx-auto max-w-7xl px-6 py-8">
    <nav className="flex items-center justify-between">
      <a href="#home" className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
          ◉
        </span>
        <span className="text-xl font-bold tracking-tight">
          Portfolio <span className="text-cyan-300"></span>
        </span> 
      </a> 

      <div className="hidden rounded-full border border-white/10 bg-white/5 p-1 text-sm text-slate-300 backdrop-blur md:flex">
        <a href="#projects" className="rounded-full bg-cyan-300 px-5 py-2 font-semibold text-slate-950">
          Projects
        </a>
        <a href="#skills" className="px-5 py-2 hover:text-white">
          Skills
        </a>
        <a href="#path" className="px-5 py-2 hover:text-white">
          Learning
        </a>
        <a href="#contact" className="px-5 py-2 hover:text-white">
          Contact
        </a>
      </div>
    </nav>

    <div id="home" className="pt-20">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300">
        Full Stack Internship Console
      </p>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
            Building clean interfaces and structured backend foundations.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A portfolio command center showing my progress in Next.js App
            Router, NestJS fundamentals, GitHub workflow, AI-assisted
            development, and code review.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Current module</p>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Online
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            Week 2 Day 1: Next.js + NestJS Basics
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Practicing pages, layouts, server components, client
            components, modules, controllers, services, and a Hello API.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm text-slate-400">Projects</p>
          <p className="mt-2 text-3xl font-bold text-cyan-300">03</p>
          <p className="mt-1 text-xs text-slate-500">tracked outputs</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm text-slate-400">Skills</p>
          <p className="mt-2 text-3xl font-bold text-emerald-300">08</p>
          <p className="mt-1 text-xs text-slate-500">active focus</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm text-slate-400">Frontend</p>
          <p className="mt-2 text-3xl font-bold">Next.js</p>
          <p className="mt-1 text-xs text-slate-500">App Router</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm text-slate-400">Backend</p>
          <p className="mt-2 text-3xl font-bold">NestJS</p>
          <p className="mt-1 text-xs text-slate-500">Hello API</p>
        </div>
      </div>
    </div>

    <section id="projects" className="grid gap-5 py-20 lg:grid-cols-[0.9fr_1.3fr_0.9fr]">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Project queue</h2>
          <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            3 active
          </span>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-cyan-300/50"
            >
              <div className="flex items-center gap-4">
                <span className="rounded-xl bg-cyan-300/10 px-3 py-2 text-sm font-bold text-cyan-300">
                  {project.code}
                </span>
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-slate-400">{project.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
              Selected Work
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Internship development dashboard
            </h2>
          </div>

          <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-cyan-300 text-sm font-bold text-cyan-300">
            92%
          </div>
        </div>

        <div className="space-y-5">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row">
                <div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="mt-2 leading-7 text-slate-300">
                    {project.description}
                  </p>
                </div>

                <span className="h-fit rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {project.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Profile signal</h2>
          <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            Ready
          </span>
        </div>

        <div className="rounded-2xl bg-black/30 p-5 font-mono text-sm leading-7 text-slate-300">
          <p>role: full-stack intern</p>
          <p>frontend: next.js app router</p>
          <p>backend: nestjs basics</p>
          <p>workflow: github pr based</p>
          <p>focus: clean learning outputs</p>
        </div>

        <a
          href="https://github.com/abdnad-ai/internship-roadmap"
          className="mt-5 block rounded-full bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
        >
          View GitHub Repository
        </a>
      </div>
    </section>

    <section id="skills" className="grid gap-6 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
          Skills Matrix
        </p>
        <h2 className="mt-4 text-4xl font-bold">
          Technologies currently being practiced.
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300 hover:text-cyan-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>

    <section id="path" className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
            Learning Path
          </p>
          <h2 className="mt-4 text-4xl font-bold">
            From setup to full-stack basics.
          </h2>
        </div>

        <div className="space-y-4">
          {learningPath.map((item, index) => (
            <div
              key={item}
              className="flex gap-4 border-b border-white/10 pb-4 last:border-b-0"
            >
              <span className="font-mono text-sm text-cyan-300">
                0{index + 1}
              </span>
              <p className="text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="contact" className="py-20">
      <div className="rounded-3xl bg-cyan-300 px-6 py-12 text-center text-slate-950">
        <p className="text-sm font-bold uppercase tracking-[0.35em]">
          Contact
        </p>
        <h2 className="mt-4 text-4xl font-bold">
          Open to feedback, learning, and collaboration.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7">
          This portfolio will keep improving as I complete more internship
          tasks and add stronger full-stack projects.
        </p>
      </div>
    </section>

    <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
      Built with Next.js App Router for Week 2 Day 1 internship practice.
    </footer>
  </section>
</main>


);
} 

