import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* no sidebar here OR add admin-specific sidebar */}
      <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}