import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar.tsx";
import { CardDefault } from "../components/app-card.tsx";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 py-100 ">
        <div className="md:hidden p-2">
          <SidebarTrigger />
        </div>
        {children}

        <CardDefault />
      </main>
    </SidebarProvider>
  );
}
