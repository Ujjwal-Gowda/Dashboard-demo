import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar.tsx";
import { CardDefault } from "../components/app-card.tsx";
import DemoPage from "../components/table/page.tsx";
import { ChartAreaInteractive } from "../components/area-chart.tsx";
import { BreadcrumbDemo } from "../components/breadCrumb.tsx";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="flex w-full h-screen gap-5 ">
        <div className=" flex-none">
          <AppSidebar />
          <div className="md:hidden p-2">
            <SidebarTrigger />
          </div>
        </div>
        {children}
        <div className="flex-1 grid grid-cols-[320px_1fr] gap-10 p-5">
          <div className="col-span-2 h-10 p-3">
            <BreadcrumbDemo />
          </div>
          <div className="h-fit py-5">
            <CardDefault />
          </div>
          <div className="min-w-0">
            <DemoPage />
          </div>
          <div className="col-start-1 col-end-3">
            <ChartAreaInteractive />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
