import AppShell from "../../components/AppShell";
import PageHeader from "../../components/PageHeader";
import MissionCard from "../../components/MissionCard";
import SignalCard from "../../components/SignalCard";

const missions = [
  {
    title: "Route-Based Dashboard System",
    level: "Frontend Mission",
    match: "94% match",
    focus:
      "Build separate pages for each dashboard feature using the Next.js App Router.",
    accent: "text-[#e56b8c]",
  }, 
  {
    title: "Reusable Interface Kit",
    level: "UI Architecture",
    match: "88% match",
    focus:
      "Create shared components such as AppShell, Sidebar, PageHeader, cards, and feature blocks.",
    accent: "text-[#d7a84f]",
  },
  {
    title: "Users CRUD API Skeleton",
    level: "Backend Mission",
    match: "81% match",
    focus:
      "Prepare a NestJS Users module with controller, service, and basic CRUD route structure.",
    accent: "text-[#7bdcb5]",
  },
];

const timeline = [
  "Create dashboard routes",
  "Build feature page layouts",
  "Prepare backend CRUD skeleton",
  "Add reports and screenshots",
];

export default function MissionsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Mission Board"
          title="Project missions matched to skill level, focus time, and learning priority."
          description="Instead of a plain task list, this board turns internship work into focused missions with purpose, priority, and suggested execution order."
          accent="rose"
        />

        <section className="grid gap-5 md:grid-cols-3">
          <SignalCard
            label="Open Missions"
            value="3"
            description="Current frontend and backend tasks for Week 2 Day 2."
            accent="rose"
          />
          <SignalCard
            label="Best Match"
            value="94%"
            description="Route-based dashboard work fits today&apos;s Next.js practice."
            accent="gold"
          />
          <SignalCard
            label="Next Unlock"
            value="CRUD"
            description="After frontend pages, move to NestJS users module and routes."
            accent="mint"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            {missions.map((mission) => (
              <MissionCard
                key={mission.title}
                title={mission.title}
                level={mission.level}
                match={mission.match}
                focus={mission.focus}
                accent={mission.accent}
              />
            ))}
          </div>

          <aside className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7">
            <p className="text-xs uppercase tracking-[0.4em] text-[#9d7cff]">
              Execution Path
            </p>

            <div className="mt-8 space-y-5">
              {timeline.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-3xl bg-[#120f1a] p-5"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#d7a84f] text-sm font-black text-[#120f1a]">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-black text-[#f6efe7]">{item}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#b8afc7]">
                      Complete this step before moving to the next mission phase.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7">
          <p className="text-xs uppercase tracking-[0.4em] text-[#d7a84f]">
            Mission Insight
          </p>

          <h3 className="mt-4 text-3xl font-black text-[#f6efe7]">
            Build less, but make every route feel intentional.
          </h3>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b8afc7]">
            The goal is not to overload the dashboard with random sections. Each
            feature page should have a clear reason to exist: skills show growth,
            missions show work priority, pods show people structure, and vault
            shows reflection history.
          </p>
        </section>
      </div>
    </AppShell>
  );
}