const mockMessages = [
  { role: "user", content: "Can you help me draft a roadmap for the next quarter?" },
  { role: "ai", content: "Sure, let's break it into three phases: discovery, build, and launch. What's the main goal for this quarter?" },
  { role: "user", content: "Mainly shipping the new onboarding flow and improving retention." },
  { role: "ai", content: "Good, I'd suggest starting discovery in week 1 to 2, build across week 3 to 8, and reserve the last 2 weeks for testing and launch prep." },
];

export default async function SessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="px-10 py-8 font-[family-name:var(--font-dash)] max-w-3xl">
      <p style={{ color: "var(--dash-muted)" }} className="text-xs mb-2">
        Session #{id}
      </p>
      <h1 style={{ color: "var(--dash-text)" }} className="text-2xl font-bold mb-8">
        Product roadmap draft
      </h1>

      <div className="flex flex-col gap-4">
        {mockMessages.map((msg, i) => (
          <div
            key={i}
            style={{
              background: msg.role === "user" ? "var(--dash-accent)" : "var(--dash-surface)",
              border: msg.role === "ai" ? "1px solid rgba(255,255,255,0.06)" : "none",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              color: msg.role === "user" ? "white" : "var(--dash-text)",
            }}
            className="rounded-lg px-4 py-3 max-w-lg text-sm"
          >
            {msg.content}
          </div>
        ))}
      </div>
    </main>
  );
} 