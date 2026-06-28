import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import WorkspaceCard from "@/components/WorkspaceCard";
import verifyToken from "@/lib/auth";
import { getUserWorkspaces } from "@/services/workspace.service";
import { MoveRight, Search } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WorkspaceType } from "../../../generated/prisma/enums";
import Link from "next/link";
import JoinCreateWorkspaceCard, { CardType, JoinCreateWorkspaceCardType, } from "@/components/CreateWorkSpaceCard";

const workspaceCards = [
  {
    featuredImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&auto=format&fit=crop",
    workspaceName: "Hariom's Workspace",
    workspaceDetail: "Your personal space to organize important documents.",
    memberCount: "1 Member",
    type: WorkspaceType.PERSONAL,
    role: "Owner",
  },
  {
    featuredImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop",
    workspaceName: "Marketing Team",
    workspaceDetail: "Campaign assets, reports, and brand resources.",
    memberCount: "12 Members",
    type: WorkspaceType.TEAM,
    role: "Admin",
  },
  {
    featuredImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop",
    workspaceName: "Design Team",
    workspaceDetail: "UI kits, design systems, and creative assets.",
    memberCount: "8 Members",
    type: WorkspaceType.TEAM,
    role: "Member",
  },
  {
    featuredImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop",
    workspaceName: "Engineering",
    workspaceDetail: "Technical docs, architecture, and sprint notes.",
    memberCount: "25 Members",
    type: WorkspaceType.TEAM,
    role: "Member",
  },
  {
    featuredImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop",
    workspaceName: "Human Resources",
    workspaceDetail: "Policies, onboarding documents, and employee records.",
    memberCount: "6 Members",
    type: WorkspaceType.TEAM,
    role: "Owner",
  },
  {
    featuredImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop",
    workspaceName: "Finance",
    workspaceDetail: "Budgets, invoices, and financial reports.",
    memberCount: "10 Members",
    type: WorkspaceType.TEAM,
    role: "Admin",
  },
];

const JoinCreateCardData: JoinCreateWorkspaceCardType[] = [
  {
    title: 'Join Workspace',
    subtitle: 'Join an existing workspace using an invite link.',
    imgUrl: '',
    linkText: 'Join Workspace',
    linkUrl: '#',
    type: CardType.CREATE
  },
  {
    title: 'Create Workspace',
    subtitle: 'Create a new workspace for yourself or your team',
    imgUrl: '',
    linkText: 'Create Workspace',
    linkUrl: '#',
    type: CardType.JOIN
  }
]
export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("dochub")?.value;
  if (!token) {
    redirect("/login");
  }

  const user = verifyToken(token);
  const data = await getUserWorkspaces(user.userId);
  console.log(data);

  return (
    <div className="mx-20 my-10">
      <h1 className="font-extrabold space-x-16 text-3xl">
        Good Morning, {user.firstName}
      </h1>
      <p className="text-muted-foreground">
        Here&apos;s an overview of the workspaces you are part of
      </p>
      <div className="mt-4 mb-8">
        <InputGroup className="px-0 py-5 max-w-190">
          <InputGroupInput type="text" placeholder="Search Workspaces..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div>
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">Personal Workspaces</h2>
          <Link
            href="#"
            className="hover:border-b border-black font-bold flex gap-2 items-center"
          >
            View All <MoveRight size={14} />
          </Link>
        </div>
        <div className="flex flex-wrap">
          {workspaceCards
            .filter((card) => card.type === WorkspaceType.PERSONAL)
            .map((card) => (
              <WorkspaceCard data={card} key={card.workspaceName} />
            ))}
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">Team Workspaces</h2>
          <Link
            href="#"
            className="hover:border-b border-black font-bold flex gap-2 items-center"
          >
            View All <MoveRight size={14} />
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {workspaceCards
            .filter((card) => card.type === WorkspaceType.TEAM)
            .map((card) => (
              <WorkspaceCard data={card} key={card.workspaceName} />
            ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-bold text-xl">Join or Create</h2>
        <div className="flex gap-10">
          {JoinCreateCardData.map((card)=>(
            <JoinCreateWorkspaceCard data={card} key={card.title}/>
          ))}
        </div>
      </div>
    </div>
  );
}
