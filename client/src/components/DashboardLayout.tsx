import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import { Eye, LayoutDashboard, LogOut, PanelLeft, Plus } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";

const menuItems = [{ icon: LayoutDashboard, label: "Projects", path: "/admin" }, { icon: Plus, label: "New project", path: "/admin" }, { icon: Eye, label: "View public site", path: "/" }];
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(() => Number(localStorage.getItem("sidebar-width")) || 250);
  const { loading, user } = useAuth();
  useEffect(() => { localStorage.setItem("sidebar-width", String(sidebarWidth)); }, [sidebarWidth]);
  if (loading) return <DashboardLayoutSkeleton />;
  if (!user) return <div className="flex min-h-screen items-center justify-center"><p>Sign in to continue.</p></div>;
  return <SidebarProvider style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}><DashboardLayoutContent setSidebarWidth={setSidebarWidth}>{children}</DashboardLayoutContent></SidebarProvider>;
}
function DashboardLayoutContent({ children, setSidebarWidth }: { children: React.ReactNode; setSidebarWidth: (width: number) => void }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => { const move = (event: MouseEvent) => { if (!isResizing) return; const left = sidebarRef.current?.getBoundingClientRect().left ?? 0; const width = event.clientX - left; if (width >= 200 && width <= 380) setSidebarWidth(width); }; const up = () => setIsResizing(false); if (isResizing) { document.addEventListener("mousemove", move); document.addEventListener("mouseup", up); document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none"; } return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseup", up); document.body.style.cursor = ""; document.body.style.userSelect = ""; }; }, [isResizing, setSidebarWidth]);
  return <><div className="relative" ref={sidebarRef}><Sidebar collapsible="icon" className="border-r-0" disableTransition={isResizing}><SidebarHeader className="h-20 justify-center"><div className="flex w-full items-center gap-3 px-2"><button onClick={toggleSidebar} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition hover:bg-white/10" aria-label="Toggle navigation"><PanelLeft className="h-4 w-4 text-sidebar-foreground/70" /></button>{!isCollapsed && <div className="min-w-0"><div className="font-display text-lg font-bold tracking-[-.06em]">AR<span className="text-[#ff9f86]">.</span></div><div className="text-[9px] uppercase tracking-[.18em] text-sidebar-foreground/45">Portfolio CMS</div></div>}</div></SidebarHeader><SidebarContent><SidebarMenu className="px-2 py-2">{menuItems.map((item, index) => <SidebarMenuItem key={`${item.label}-${index}`}><SidebarMenuButton isActive={index === 0 && location === "/admin"} onClick={() => setLocation(item.path)} tooltip={item.label} className="h-11 font-normal text-sidebar-foreground/70 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground"><item.icon className="h-4 w-4" /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarContent><SidebarFooter className="p-3"><DropdownMenu><DropdownMenuTrigger asChild><button className="group flex w-full items-center gap-3 rounded-lg px-1 py-1 text-left transition hover:bg-white/10"><Avatar className="h-9 w-9 shrink-0 border border-white/15"><AvatarFallback className="bg-white/10 text-xs font-medium text-white">{user!.name?.charAt(0).toUpperCase()}</AvatarFallback></Avatar><div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden"><p className="truncate text-sm font-medium text-sidebar-foreground">{user!.name}</p><p className="mt-1.5 truncate text-xs text-sidebar-foreground/50">{user!.email}</p></div></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-48"><DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive"><LogOut className="mr-2 h-4 w-4" /> Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu></SidebarFooter></Sidebar><div className={`absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-[#ff9f86]/30 ${isCollapsed ? "hidden" : ""}`} onMouseDown={() => setIsResizing(true)} /></div><SidebarInset>{isMobile && <div className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b bg-[#1b2c2b] px-2 text-white"><SidebarTrigger className="h-9 w-9 rounded-lg bg-white/10" /><span className="font-display text-sm">Portfolio CMS</span></div>}<main className="flex-1">{children}</main></SidebarInset></>;
}
