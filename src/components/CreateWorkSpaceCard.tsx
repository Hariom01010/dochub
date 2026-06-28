import { MoveRight, PlusIcon, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export enum CardType {
    CREATE,
    JOIN
}
export interface JoinCreateWorkspaceCardType {
    title: string;
    subtitle: string;
    imgUrl: string;
    linkText: string;
    linkUrl: string;
    type: CardType;
}

export default function JoinCreateWorkspaceCard({data}: {data: JoinCreateWorkspaceCardType}) {
  return (
    <div className="border w-max max-w-100 px-4 py-4 my-4 rounded-lg shadow-md">
      <div className="flex gap-4 mb-2 items-center">
        {data.type == CardType.CREATE ? (
            <PlusIcon className="bg-green-200 text-green-600 px-3 rounded-md" size={50}/>
        ): (
            <UserPlus className="bg-green-200 text-green-600 px-3 rounded-md" size={50}/>
        )}

        <div>
          <div className="flex gap-4">
            <h3 className="font-bold">{data.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2 mb-4 ">
            {data.subtitle}
          </p>
          <Link href={data.linkUrl} className="font-bold text-sm text-green-600 flex gap-2 items-center">{data.linkText} <MoveRight size={14}/></Link>
        </div>
      </div>
    </div>
  );
}
