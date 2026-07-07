export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 border-b border-white/5 backdrop-blur-sm bg-[var(--color-bg)]/60">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-green-bright)]" />
        <span className="font-display text-lg font-semibold tracking-wide text-[var(--color-text)]">
          NEXTGEN
        </span>
      </div>
      <div className="flex items-center gap-8 text-sm text-[var(--color-text-muted)]">
        <a href="#" className="hover:text-[var(--color-text)] transition-colors">Overview</a>
        <a href="#" className="hover:text-[var(--color-text)] transition-colors">Chat</a>
        <a href="#" className="hover:text-[var(--color-text)] transition-colors">Sessions</a>
        <button className="px-4 py-2 rounded-md bg-[var(--color-green)] text-[var(--color-text)] hover:bg-[var(--color-green-bright)] transition-colors">
          Launch
        </button>
      </div>
    </nav>
  );
} 