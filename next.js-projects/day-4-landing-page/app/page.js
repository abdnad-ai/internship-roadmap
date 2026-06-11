 const features = [
  {
    title: "Smart Code Guidance",
    description:
      "Get clear development support for frontend, backend, debugging, and documentation tasks.",
  },
  {
    title: "Debugging Support",
    description:
      "Understand errors faster with structured guidance for logs, broken APIs, and failed builds.",
  },
  {
    title: "Cleaner Workflow",
    description:
      "Use AI to plan, review, refactor, and document work without losing control of the code.",
  },
]; 

const workflowSteps = [
  {
    step: "01",
    title: "Describe the Task",
    description:
      "Provide the project stack, current goal, constraints, and expected output.",
  },
  {
    step: "02",
    title: "Review AI Output",
    description:
      "Check the answer, remove unnecessary code, and make sure it matches the project.",
  },
  {
    step: "03",
    title: "Build and Verify",
    description:
      "Apply the changes, test the page manually, and document the final result.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-green-400">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <h1 className="text-xl font-bold tracking-tight">AI Developer Assistant</h1>

        <div className="hidden items-center gap-6 text-sm text-green-300 md:flex">
          <a href="#features" className="hover:text-green-400">
            Features
          </a>
          <a href="#workflow" className="hover:text-green-400">
            Workflow
          </a>
          <a href="#contact" className="hover:text-green-400">
            Contact
          </a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            AI Assisted Development
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            Build better software with smarter developer prompts.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-green-300">
            A practical assistant concept for junior developers to plan tasks,
            debug issues, refactor code, and document work with more confidence.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#features"
className="w-full rounded-full bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"            >
              Explore Features
            </a>

            <a
              href="#workflow"
className="w-full rounded-full border border-slate-700 px-6 py-3 text-center font-semibold text-white transition hover:border-cyan-400 sm:w-auto"            >
              See Workflow
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl sm:p-6">
          <div className="rounded-2xl bg-slate-950 p-5">
            <p className="text-sm text-green-400">Prompt Example</p>
            <p className="mt-4 text-lg leading-8 text-green-200">
              “Review this NestJS service and suggest a safer refactor without
              changing the API response or business logic.”
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-800 p-4">
              <p className="text-2xl font-bold text-violet-400">100</p>
              <p className="text-sm text-green-300">Developer Prompts</p>
            </div>

            <div className="rounded-2xl bg-slate-800 p-4">
              <p className="text-2xl font-bold text-violet-400">10</p>
              <p className="text-sm text-green-300">Prompt Categories</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Practical support for everyday development work.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-4 leading-7 text-green-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Workflow
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            A simple process for using AI responsibly.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {workflowSteps.map((item) => (
            <div key={item.step} className="rounded-3xl bg-slate-900 p-6">
              <p className="text-sm font-bold text-violet-400">{item.step}</p>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-pgreen-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl bg-violet-400 px-6 py-12 text-center text-green-950">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to improve your development workflow?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Use structured prompts to work faster, understand errors better, and
            keep your code clean.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-green-400">
        © 2026 AI Developer Assistant. Built for Week 1 Day 4 internship practice.
      </footer>
    </main>
  );
}



 