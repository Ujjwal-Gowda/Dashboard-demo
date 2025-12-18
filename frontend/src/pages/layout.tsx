import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar.tsx";
import { BreadcrumbDemo } from "../components/breadCrumb.tsx";
export default function layout() {
  return (
    <SidebarProvider>
      <main className="flex w-full h-screen gap-5 ">
        <div className=" flex-none">
          <AppSidebar />
          <div className="md:hidden p-2">
            <SidebarTrigger />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-[320px_1fr] gap-10 p-5">
          <div className="col-span-2 h-10 p-3">
            <BreadcrumbDemo />
          </div>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
