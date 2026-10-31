import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
    return (
        <div className="w-full max-w-none flex flex-col lg:flex-row min-h-[80vh]">

            {/* sidebar - hidden on mobile, shown via drawer */}
            <div className="hidden lg:block shrink-0">
                <AdminSidebar />
            </div>

            {/* Mobile drawer toggle button */}
            <div className="lg:hidden">
                <AdminSidebar />
            </div>

            {/* content area */}
            <main className="flex-1 p-2 sm:p-4 lg:p-5 bg-base-100 w-full">
                <Outlet />
            </main>

        </div>
    );
}
