import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar.tsx";
import { BreadcrumbDemo } from "../components/breadCrumb.tsx";
export default function layout() {
  return (
    <SidebarProvider>
      <main className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <div className="flex-none">
          <AppSidebar />
          <div className="md:hidden p-2">
            <SidebarTrigger />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <BreadcrumbDemo />
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
