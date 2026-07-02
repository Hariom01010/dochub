"use client"

import { MoveRight, PlusIcon, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { WorkspaceType } from "../../generated/prisma/enums";

export enum CardType {
  CREATE,
  JOIN,
}
export interface JoinCreateWorkspaceCardType {
  title: string;
  subtitle: string;
  imgUrl: string;
  linkText: string;
  linkUrl: string;
  type: CardType;
}

type Inputs = {
  name: string;
  type: WorkspaceType;
  members?: string[];
};

export default function JoinCreateWorkspaceCard({
  data,
}: {
  data: JoinCreateWorkspaceCardType;
}) {
  const { register, handleSubmit, control } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="border w-max max-w-100 px-4 py-4 my-4 rounded-lg shadow-md">
      <div className="flex gap-4 mb-2 items-center">
        {data.type == CardType.CREATE ? (
          <PlusIcon
            className="bg-green-200 text-green-600 px-3 rounded-md"
            size={50}
          />
        ) : (
          <UserPlus
            className="bg-green-200 text-green-600 px-3 rounded-md"
            size={50}
          />
        )}

        <div>
          <div className="flex gap-4">
            <h3 className="font-bold">{data.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2 mb-4 ">
            {data.subtitle}
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <p className="font-bold text-sm text-green-600 flex gap-2 items-center">
                {data.linkText} <MoveRight size={14} />
              </p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Workspace</DialogTitle>
                <DialogDescription>
                  Set up a new workspace and start organizing your files.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Workspace Name</FieldLabel>
                    <Input type="text" {...register("name")} />
                  </Field>
                  <Field>
                    <FieldLabel>Workspace Type</FieldLabel>
                    <Field>
                      <FieldLabel>Workspace Type</FieldLabel>

                      <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value={WorkspaceType.PERSONAL}>
                                Personal
                              </SelectItem>
                              <SelectItem value={WorkspaceType.TEAM}>
                                Team
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>
                  </Field>
                </FieldGroup>
                <div className="flex justify-end">
                  <Button type="submit" className="w-max bg-black">
                    Create
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
