import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
} from "./ui/sidebar";
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>UG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <span className="text-sm font-semibold">Ujjwal</span>
            <span className="text-xs text-muted-foreground">Developer</span>
          </div>
        </div>
      </SidebarHeader>

      <Separator />

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home */}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/")}>
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Market (Collapsible) */}
              <Collapsible defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Inbox className="h-5 w-5" />
                      <span>Market</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {/* crypto */}
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          onClick={() => navigate("/market/crypto")}
                        >
                          Crypto
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      {/* stocks */}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          onClick={() => navigate("/market/stocks")}
                        >
                          Stocks
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      {/* forex */}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          onClick={() => navigate("/market/forex")}
                        >
                          Forex
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/watchlist")}>
                  <Calendar className="h-5 w-5" />
                  <span>WatchList</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Converter */}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/converter")}>
                  <Search className="h-5 w-5" />
                  <span>Converter</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator />

      {/* Footer */}
      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/settings")}>
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
