import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "inbox", icon: Inbox },
  { title: "Calendar", url: "calender", icon: Calendar },
  { title: "Search", url: "search", icon: Search },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="!border-r bg-background">
      {/* Header */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="!h-9 !w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
            <AvatarFallback>UG</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold">Ujjwal</span>
            <span className="truncate text-xs text-muted-foreground">
              Developer
            </span>
          </div>
          <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
        </div>
      </SidebarHeader>

      <Separator />

      {/* Content */}
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs tracking-wide text-muted-foreground">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="!h-11  rounded-xl gap-3 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                  >
                    <a href={item.url}>
                      <item.icon className="!h-5 !w-5 text-primary" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator />

      {/* Footer */}
      <SidebarFooter className="p-3">
        <div className="flex flex-col gap-1 ">
          <SidebarMenuButton className="w-full justify-start gap-3 rounded-xl">
            <Settings className="!h-5 !w-5" />
            <span className="text-sm">Settings</span>
          </SidebarMenuButton>
          <SidebarMenuButton className="w-full  gap-3 rounded-xl text-destructive hover:text-destructive">
            <LogOut className="!h-5 !w-5" />
            <span className="text-sm">Logout</span>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
