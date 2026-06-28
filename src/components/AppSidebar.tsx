import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Image from "next/image";
import verifyToken from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import { ChevronDown, ChevronsUpDown, Folder, LogOutIcon, User2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const personalWorkspaces = [
  {
    id: "personal-1",
    name: "Hariom's Workspace",
  },
];

const teamWorkspaces = [
  {
    id: "team-1",
    name: "Marketing Team",
  },
  {
    id: "team-2",
    name: "Design Team",
  },
  {
    id: "team-3",
    name: "Engineering",
  },
  {
    id: "team-5",
    name: "Human Resources",
  },
  {
    id: "team-4",
    name: "Finance",
  },
];

export default async function AppSidebar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("dochub")?.value;
  if (!token) {
    redirect("/login");
  }

  const user = verifyToken(token);
  return (
    <Sidebar>
      <SidebarHeader>
        <Image src="/logo.png" width={80} height={24} />
      </SidebarHeader>
      <SidebarContent>
        <Collapsible className="group">
          <SidebarGroup>
            <SidebarGroupLabel>
              <CollapsibleTrigger className="flex justify-between w-full">
                Personal Workspaces{" "}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {personalWorkspaces.map((workspace) => (
                    <SidebarMenuItem key={workspace.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/w/${workspace.id}`}>
                          <Folder className="h-4 w-4" />
                          <span>{workspace.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible className="group">
          <SidebarGroup>
            <SidebarGroupLabel>
              <CollapsibleTrigger className="flex justify-between w-full">
                Team Workspaces{" "}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {teamWorkspaces.map((workspace) => (
                    <SidebarMenuItem key={workspace.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/w/${workspace.id}`}>
                          <Folder className="h-4 w-4" />
                          <span>{workspace.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="items-center gap-4">
                  
                  <Avatar>
                    <AvatarImage src={user.img} />
                    <AvatarFallback>
                      <User2Icon />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{user.firstName}</p>
                    <p>{user.email}</p>
                  </div>
                  <ChevronsUpDown />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="#" className="flex items-center gap-2">
                    <LogOutIcon />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
