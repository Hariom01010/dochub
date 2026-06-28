import Image from "next/image";
import React from "react";
import { WorkspaceType } from "../../generated/prisma/enums";

interface WorkspaceCard {
  featuredImage: string;
  workspaceName: string;
  workspaceDetail: string;
  memberCount: string;
  type: WorkspaceType;
  role: string;
}

export default function WorkspaceCard({ data }: { data: WorkspaceCard }) {
  return (
    <div className="border w-max max-w-100 px-4 py-4 my-4 rounded-lg shadow-md">
      <div className="flex gap-4 mb-2">
        <Image
          src={data.featuredImage}
          width={100}
          height={100}
          className="rounded-md"
        />

        <div>
          <div className="flex gap-4">
            <h3 className="font-bold">{data.workspaceName}</h3>
            {data.type === "PERSONAL" ? (
              <p className="text-xs font-bold text-green-800 bg-green-100 px-3 py-1 rounded-full">
                Personal
              </p>
            ) : (
              <p className="text-xs font-bold text-green-800 bg-green-100 px-3 py-1 rounded-full">
                {data.role}
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {data.workspaceDetail}
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="text-muted-foreground text-xs font-bold">
          <p>{data.memberCount}</p>
        </div>
      </div>
    </div>
  );
}
