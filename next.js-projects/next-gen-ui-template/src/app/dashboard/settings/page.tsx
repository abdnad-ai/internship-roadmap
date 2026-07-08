const settingsSections = [
  {
    title: "Profile",
    fields: [
      { label: "Name", value: "abdnad" },
      { label: "Email", value: "nad@example.com" },
    ],
  },
  { 
    title: "Preferences",
    fields: [
      { label: "Response length", value: "Balanced" },
      { label: "Streaming responses", value: "Enabled" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <main className="px-10 py-8 font-[family-name:var(--font-dash)] max-w-2xl">
      <h1 style={{ color: "var(--dash-text)" }} className="text-2xl font-bold mb-8">
        Settings
      </h1>
      <div className="flex flex-col gap-6">
        {settingsSections.map((section) => (
          <div
            key={section.title}
            style={{ background: "var(--dash-surface)", border: "1px solid rgba(255,255,255,0.06)" }}
            className="rounded-lg p-6"
          >
            <h2 style={{ color: "var(--dash-text)" }} className="text-sm font-bold mb-4">
              {section.title}
            </h2>
            <div className="flex flex-col gap-3">
              {section.fields.map((field) => (
                <div key={field.label} className="flex items-center justify-between">
                  <span style={{ color: "var(--dash-muted)" }} className="text-sm">
                    {field.label}
                  </span>
                  <span style={{ color: "var(--dash-text)" }} className="text-sm font-medium">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 