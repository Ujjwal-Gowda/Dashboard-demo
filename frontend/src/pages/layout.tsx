import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { BreadcrumbDemo } from "../components/breadCrumb";

export default function Layout() {
  return (
    <SidebarProvider>
      <main className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center gap-4 border-b px-6 py-4">
            <SidebarTrigger />
            <BreadcrumbDemo />
          </header>
          <div className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
