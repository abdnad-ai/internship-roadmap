import CasinoPageHero from "@/components/CasinoPageHero";

const faqs = [
  { q: "How long do withdrawals take?", a: "Most withdrawals are processed within 24 hours." },
  { q: "What payment methods are supported?", a: "Cards, bank transfer, and major crypto wallets." },
  { q: "Is my account verified automatically?", a: "Verification usually completes within a few minutes of submitting documents." },
];

export default function SupportPage() {
  return (
    <main className="relative px-10 py-10">
      <CasinoPageHero
        title="Support"
        subtitle="Here to help, whenever you need it."
        icon="Headphone"
        from="#0f6e6e"
        to="#17a2a2"
      />
      <h2 style={{ color: "var(--casino-text)" }} className="text-base font-bold mb-4">
        Frequently asked questions
      </h2>
      <div className="flex flex-col gap-2 mb-8">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.08)" }}
            className="rounded-lg p-5"
          >
            <p style={{ color: "var(--casino-text)" }} className="text-sm font-bold mb-1">
              {faq.q}
            </p>
            <p style={{ color: "var(--casino-muted)" }} className="text-xs">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
      <div style={{ background: "var(--casino-surface)", border: "1px solid rgba(255,255,255,0.08)" }} className="rounded-lg p-5">
        <p style={{ color: "var(--casino-text)" }} className="text-sm font-bold mb-1">
          Still need help?
        </p>
        <p style={{ color: "var(--casino-muted)" }} className="text-xs mb-3">
          Live chat is available 24/7.
        </p>
        <button
          style={{ background: "var(--casino-accent)", color: "white" }}
          className="px-4 py-2 rounded-md text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Start live chat
        </button>
      </div>
    </main>
  );
} 