import AppShell from "../../components/AppShell";
import PageHeader from "../../components/PageHeader";
import SignalCard from "../../components/SignalCard";

const reflections = [
  {
    title: "Next.js routing became clearer",
    tag: "Frontend",
    note: "Creating separate pages showed how App Router connects folders to browser routes.",
  },
  {
    title: "Reusable components saved time",
    tag: "UI System",
    note: "AppShell, Sidebar, PageHeader, and cards helped keep pages consistent without repeating layout code.",
  },
  {
    title: "Backend CRUD is the next bridge",
    tag: "NestJS",
    note: "The frontend dashboard now has a users-style concept through Talent Pods, ready to connect with a Users API skeleton.",
  },
];

const aiNotes = [
  "Used AI to brainstorm a more original dashboard concept.",
  "Used AI to generate reusable component structure.",
  "Manually checked routing behavior and noticed missing page files.",
  "Improved the design direction from a simple layout to a premium dashboard.",
];

export default function VaultPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Reflection Vault"
          title="A living archive of learning decisions, AI usage, and project observations."
          description="This page turns daily reports and AI usage into a product feature, showing what was learned, what was improved, and what should be revisited later."
          accent="gold"
        />

        <section className="grid gap-5 md:grid-cols-3">
          <SignalCard
            label="Reflections"
            value="3"
            description="Key learning notes captured from today&apos;s frontend work."
            accent="gold"
          />
          <SignalCard
            label="AI Prompts"
            value="4"
            description="AI was used for structure, concept design, and implementation support."
            accent="violet"
          />
          <SignalCard
            label="Review Later"
            value="Yes"
            description="After the deadline, revisit routing, components, and Tailwind layout choices."
            accent="rose"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7">
            <p className="text-xs uppercase tracking-[0.4em] text-[#d7a84f]">
              Learning Entries
            </p>

            <div className="mt-8 space-y-5">
              {reflections.map((reflection) => (
                <article
                  key={reflection.title}
                  className="rounded-3xl bg-[#120f1a] p-5"
                >
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <h3 className="text-xl font-black text-[#f6efe7]">
                      {reflection.title}
                    </h3>
                    <span className="w-fit rounded-full bg-[#2a2038] px-4 py-2 text-sm font-bold text-[#7bdcb5]">
                      {reflection.tag}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#b8afc7]">
                    {reflection.note}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7">
            <p className="text-xs uppercase tracking-[0.4em] text-[#9d7cff]">
              AI Usage Trace
            </p>

            <div className="mt-8 space-y-4">
              {aiNotes.map((note, index) => (
                <div
                  key={note}
                  className="flex gap-4 rounded-3xl bg-[#120f1a] p-5"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#9d7cff] text-sm font-black text-[#120f1a]">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-6 text-[#f6efe7]">{note}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7">
          <p className="text-xs uppercase tracking-[0.4em] text-[#e56b8c]">
            After Deadline Review
          </p>

          <h3 className="mt-4 text-3xl font-black text-[#f6efe7]">
            Come back and understand the structure after submission.
          </h3>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b8afc7]">
            The important parts to review later are how folders inside app become
            routes, how AppShell wraps every page, how Sidebar uses the current
            pathname, and how shared components make the dashboard easier to
            expand.
          </p>
        </section>
      </div>
    </AppShell>
  );
} 