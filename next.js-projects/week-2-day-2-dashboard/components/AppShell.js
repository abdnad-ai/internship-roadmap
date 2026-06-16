import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  return (
    <main className="min-h-screen px-4 py-6 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[310px_1fr]">
        <Sidebar />
        <section>{children}</section>
      </div>
    </main>
  );
}