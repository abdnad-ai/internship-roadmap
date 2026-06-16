import AppShell from "../components/AppShell";
import PageHeader from "../components/PageHeader";
import SignalCard from "../components/SignalCard";
import MissionCard from "../components/MissionCard";
import PodCard from "../components/PodCard";

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Command Center"
          title="Today&apos;s learning signals, mission flow, and team energy in one place."
          description="SkillForge Studio helps interns see what to learn next, which project missions match their current skills, and where their focus time should go."
          accent="gold"
        />

        <section className="grid gap-5 md:grid-cols-3">
          <SignalCard
            label="Skill Momentum"
            value="74%"
            description="Frontend structure and routing confidence improved after building separate dashboard pages."
            accent="mint"
          />
          <SignalCard
            label="Mission Fit"
            value="8.6"
            description="Current tasks match your Next.js and NestJS practice level for Week 2."
            accent="gold"
          />
          <SignalCard
            label="Focus Load"
            value="3h"
            description="Estimated deep work needed to finish dashboard UI and backend CRUD skeleton."
            accent="rose"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7">
            <p className="text-xs uppercase tracking-[0.4em] text-[#9d7cff]">
              Learning Flow
            </p>

            <div className="mt-8 space-y-5">
              {[
                ["Design reusable components", "Complete"],
                ["Create separate feature routes", "In progress"],
                ["Build NestJS users CRUD skeleton", "Next"],
                ["Capture screenshots and reports", "Later"],
              ].map(([task, status]) => (
                <div
                  key={task}
                  className="flex items-center justify-between rounded-3xl bg-[#120f1a] p-5"
                >
                  <span className="font-semibold text-[#f6efe7]">{task}</span>
                  <span className="rounded-full bg-[#2a2038] px-4 py-2 text-sm text-[#d7a84f]">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <MissionCard
            title="Build a Route-Based Dashboard"
            level="Frontend Mission"
            match="92% match"
            focus="Create separate pages for skills, missions, pods, and reflections using the Next.js App Router."
            accent="text-[#e56b8c]"
          />
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <PodCard
            name="Interface Pod"
            energy="High focus"
            specialty="Best for layout systems, visual hierarchy, and reusable UI components."
            members={["A", "S", "H"]}
          />

          <PodCard
            name="Logic Pod"
            energy="Build mode"
            specialty="Best for backend modules, controllers, services, and CRUD planning."
            members={["B", "M", "Z"]}
          />
        </section>
      </div>
    </AppShell>
  );
}