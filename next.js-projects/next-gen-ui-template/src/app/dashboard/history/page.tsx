const historyGroups = [
  {
    date: "Today",
    items: ["Product roadmap draft", "Debugging auth flow", "Marketing copy review"],
  },
  {
    date: "Yesterday",
    items: ["Data pipeline questions", "Weekly report summary", "Client onboarding checklist"],
  },
  {
    date: "This week",
    items: ["Sprint retro notes", "API error triage"],
  },
];

export default function HistoryPage() {
  return (
    <main className="px-10 py-8 font-[family-name:var(--font-dash)]">
      <h1 style={{ color: "var(--dash-text)" }} className="text-2xl font-bold mb-8">
        History
      </h1>
      <div className="flex flex-col gap-8">
        {historyGroups.map((group) => (
          <div key={group.date}>
            <p style={{ color: "var(--dash-muted)" }} className="text-xs font-semibold uppercase tracking-wide mb-3">
              {group.date}
            </p>
            <div className="flex flex-col gap-2">
              {group.items.map((item) => (
                <div
                  key={item}
                  style={{ background: "var(--dash-surface)", border: "1px solid rgba(255,255,255,0.06)" }}
                  className="rounded-lg px-5 py-3 text-sm"
                >
                  <span style={{ color: "var(--dash-text)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 