"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react";

import { IconAccessPoint, IconAutomation, IconUpload, IconMessage } from "@tabler/icons-react";

import { NavMain } from "@/components/admin/nav-main";
import { NavProjects } from "@/components/admin/nav-projects";
import { TeamSwitcher } from "@/components/admin/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Updated data with proper admin routes
const data = {
  user: {
    name: "admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconAccessPoint,
      isActive: true,
      items: [
        {
          title: "Statistics",
          url: "/admin",
        },
        {
          title: "Map",
          url: "/admin/dashboard/map",
        },
        {
          title: "Analytics",
          url: "/admin/dashboard/analytics",
        },
      ],
    },
    {
      title: "Process Files",
      url: "/admin/process",
      icon: IconAutomation,
      items: [
        {
          title: "Process CSV & KML",
          url: "/admin/process/csv-kml",
        },
        {
          title: "Merge",
          url: "/admin/process/merge",
        },
      ],
    },
    {
      title: "Upload Files",
      url: "/admin/upload",
      icon: IconUpload,
      items: [
        {
          title: "Upload",
          url: "/admin/upload",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Messaging",
      url: "/admin/messaging",
      icon: IconMessage,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}