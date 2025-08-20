import { AppSidebar } from "@/components/admin/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/admin/nav-user";
import { Outlet } from "react-router-dom";

export default function AdminDashBoard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 bg-primary opacity-90 backdrop-blur sticky top-0 z-50 w-full transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer text-white" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-lg font-semibold text-white">CEIT CYBER X NETWORK</h1>
          </div>
          <div className="px-4 ">
            <NavUser user={{
              name: "admin",
              email: "ceitcybers@example.com",
              avatar: "/avatars/shadcn.jpg",
            }} />
          </div>
        </header>
       
        <main className="flex-1 p-4 overflow-y-auto bg-gray-50 pt-4">
          <Outlet />
        </main>
        {/**test */}
        <div className="flex h-screen">
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}