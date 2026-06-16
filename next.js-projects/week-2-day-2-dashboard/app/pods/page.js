import AppShell from "../../components/AppShell";
import PageHeader from "../../components/PageHeader";
import PodCard from "../../components/PodCard";
import SignalCard from "../../components/SignalCard";

const pods = [
  {
    name: "Interface Pod",
    members: ["A", "S", "H"],
    energy: "High focus",
    specialty:
      "Focused on dashboard layout, reusable components, visual hierarchy, and Tailwind UI structure.",
  },
  {
    name: "Logic Pod",
    members: ["B", "M", "Z"],
    energy: "Build mode",
    specialty:
      "Focused on NestJS modules, controllers, services, and backend CRUD planning.",
  },
  {
    name: "Review Pod",
    members: ["R", "Q", "N"],
    energy: "Sharp eye",
    specialty:
      "Focused on testing flows, checking UI consistency, reviewing code, and capturing proof screenshots.",
  },
];

const members = [
  {
    name: "Abdullah",
    role: "Frontend Builder",
    strength: "Next.js routes",
    status: "Active",
  },
  {
    name: "Sara",
    role: "API Planner",
    strength: "Controller structure",
    status: "Active",
  },
  {
    name: "Hassan",
    role: "UI Reviewer",
    strength: "Layout polish",
    status: "Review",
  },
  {
    name: "Ahmed",
    role: "Data Organizer",
    strength: "CRUD mapping",
    status: "Pending",
  },
];

export default function PodsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Talent Pods"
          title="A people structure page without looking like a basic users table."
          description="This page replaces generic user management with skill-based intern pods, showing how team members can be grouped by focus area and project contribution."
          accent="violet"
        />

        <section className="grid gap-5 md:grid-cols-3">
          <SignalCard
            label="Active Pods"
            value="3"
            description="Frontend, backend, and review-focused groups."
            accent="violet"
          />
          <SignalCard
            label="Team Energy"
            value="High"
            description="Most work is currently in focused build mode."
            accent="mint"
          />
          <SignalCard
            label="Next Assignment"
            value="API"
            description="Move from dashboard pages into NestJS users CRUD skeleton."
            accent="gold"
          />
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {pods.map((pod) => (
            <PodCard
              key={pod.name}
              name={pod.name}
              members={pod.members}
              energy={pod.energy}
              specialty={pod.specialty}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-[#3a2d4f] bg-[#1d172a]/90 p-7">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#e56b8c]">
                Member Matrix
              </p>
              <h3 className="mt-4 text-3xl font-black text-[#f6efe7]">
                Intern roles mapped by strength and current status.
              </h3>
            </div>

            <button className="rounded-full bg-[#d7a84f] px-5 py-3 text-sm font-black text-[#120f1a]">
              Assign Mission
            </button>
          </div>

          <div className="mt-8 grid gap-4">
            {members.map((member) => (
              <div
                key={member.name}
                className="grid gap-4 rounded-3xl bg-[#120f1a] p-5 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center"
              >
                <div>
                  <p className="text-lg font-black text-[#f6efe7]">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm text-[#b8afc7]">{member.role}</p>
                </div>

                <p className="text-sm text-[#d7a84f]">{member.strength}</p>

                <p className="text-sm text-[#b8afc7]">
                  Current status: {member.status}
                </p>

                <button className="rounded-full border border-[#9d7cff] px-4 py-2 text-sm font-bold text-[#9d7cff]">
                  View
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}  