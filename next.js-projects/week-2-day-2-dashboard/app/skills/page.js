import AppShell from "../../components/AppShell";
import PageHeader from "../../components/PageHeader";

const skills = [
  { name: "Next.js Routing", value: "82%", color: "bg-[#7bdcb5]" },
  { name: "Reusable Components", value: "76%", color: "bg-[#d7a84f]" },
  { name: "Tailwind Structure", value: "88%", color: "bg-[#e56b8c]" },
  { name: "NestJS API Design", value: "61%", color: "bg-[#9d7cff]" },
];

export default function SkillsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Skill Map"
          title="A visual map of growing technical confidence."
          description="Instead of showing generic charts, this page tracks the learning areas that matter for the current internship stage."
          accent="mint"
        />

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7">
            <p className="text-xs uppercase tracking-[0.4em] text-[#7bdcb5]">
              Skill Orbit
            </p>

            <div className="mt-10 grid place-items-center">
              <div className="relative grid h-72 w-72 place-items-center rounded-full border border-[#3a2d4f] bg-[#120f1a]">
                <div className="absolute h-56 w-56 rounded-full border border-[#d7a84f]/40" />
                <div className="absolute h-40 w-40 rounded-full border border-[#e56b8c]/40" />
                <div className="absolute h-24 w-24 rounded-full border border-[#9d7cff]/40" />

                <div className="z-10 rounded-full bg-[#d7a84f] px-6 py-4 text-center text-[#120f1a]">
                  <p className="text-3xl font-black">77%</p>
                  <p className="text-xs font-bold uppercase tracking-widest">
                    Growth
                  </p>
                </div>

                <span className="absolute left-4 top-10 rounded-full bg-[#2a2038] px-4 py-2 text-sm text-[#7bdcb5]">
                  UI
                </span>
                <span className="absolute right-2 top-24 rounded-full bg-[#2a2038] px-4 py-2 text-sm text-[#d7a84f]">
                  Routes
                </span>
                <span className="absolute bottom-12 left-8 rounded-full bg-[#2a2038] px-4 py-2 text-sm text-[#e56b8c]">
                  API
                </span>
                <span className="absolute bottom-6 right-8 rounded-full bg-[#2a2038] px-4 py-2 text-sm text-[#9d7cff]">
                  Logic
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7">
            <p className="text-xs uppercase tracking-[0.4em] text-[#d7a84f]">
              Current Strengths
            </p>

            <div className="mt-8 space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-semibold text-[#f6efe7]">{skill.name}</p>
                    <p className="text-sm text-[#b8afc7]">{skill.value}</p>
                  </div>

                  <div className="h-3 rounded-full bg-[#120f1a]">
                    <div
                      className={`h-3 rounded-full ${skill.color}`}
                      style={{ width: skill.value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7">
          <p className="text-xs uppercase tracking-[0.4em] text-[#e56b8c]">
            Suggested Focus
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#120f1a] p-5">
              <h3 className="font-black text-[#f6efe7]">Routing Practice</h3>
              <p className="mt-3 text-sm leading-6 text-[#b8afc7]">
                Build each dashboard feature as a separate App Router page.
              </p>
            </div>

            <div className="rounded-3xl bg-[#120f1a] p-5">
              <h3 className="font-black text-[#f6efe7]">Component Reuse</h3>
              <p className="mt-3 text-sm leading-6 text-[#b8afc7]">
                Use shared page headers, shell layout, and cards across routes.
              </p>
            </div>

            <div className="rounded-3xl bg-[#120f1a] p-5">
              <h3 className="font-black text-[#f6efe7]">Backend Bridge</h3>
              <p className="mt-3 text-sm leading-6 text-[#b8afc7]">
                Connect this frontend idea to the NestJS users CRUD skeleton later.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}  