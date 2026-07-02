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
import JoinCreateWorkspaceCard, {
  CardType,
  JoinCreateWorkspaceCardType,
} from "@/components/CreateWorkSpaceCard";

const JoinCreateCardData: JoinCreateWorkspaceCardType[] = [
  {
    title: "Join Workspace",
    subtitle: "Join an existing workspace using an invite link.",
    imgUrl: "",
    linkText: "Join Workspace",
    linkUrl: "#",
    type: CardType.CREATE,
  },
  {
    title: "Create Workspace",
    subtitle: "Create a new workspace for yourself or your team",
    imgUrl: "",
    linkText: "Create Workspace",
    linkUrl: "#",
    type: CardType.JOIN,
  },
];
export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("dochub")?.value;
  if (!token) {
    redirect("/login");
  }

  const user = verifyToken(token);
  const workspaces = [];
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
        <div className="flex flex-wrap"></div>
      </div>
      {workspaces.length > 0 ? (
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
          <div className="flex flex-wrap gap-x-6 gap-y-2"></div>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-10">
        <h2 className="font-bold text-xl">Join or Create</h2>
        <div className="flex gap-10">
          {JoinCreateCardData.map((card) => (
            <JoinCreateWorkspaceCard data={card} key={card.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
