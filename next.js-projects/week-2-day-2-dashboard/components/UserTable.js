const users = [
  { name: "Abdullah", role: "Frontend Intern", status: "Active" },
  { name: "Sara", role: "Backend Intern", status: "Active" },
  { name: "Ahmed", role: "QA Intern", status: "Review" },
  { name: "Hassan", role: "DevOps Intern", status: "Pending" },
];

export default function UserTable() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Users</h2>
        <p className="text-sm text-slate-400">CRUD skeleton preview</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="border-b border-slate-800 pb-3">Name</th>
              <th className="border-b border-slate-800 pb-3">Role</th>
              <th className="border-b border-slate-800 pb-3">Status</th>
              <th className="border-b border-slate-800 pb-3">Actions</th>
            </tr>
          </thead>

          <tbody className="text-slate-300">
            {users.map((user) => (
              <tr key={user.name}>
                <td className="border-b border-slate-800 py-4">{user.name}</td>
                <td className="border-b border-slate-800 py-4">{user.role}</td>
                <td className="border-b border-slate-800 py-4">{user.status}</td>
                <td className="border-b border-slate-800 py-4">
                  <button className="mr-3 text-cyan-400 hover:text-cyan-300">
                    Edit
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}  