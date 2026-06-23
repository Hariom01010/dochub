"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const createAccount = async () => {
    try {
      const res = await axios.post("/api/auth/register", formData);
      if(res.status == 201) {
        router.push('/login')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen rounded-md">
      <video
        width={1920}
        height={580}
        preload="none"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/animation.mp4" type="video/mp4" />
      </video>
      <Card className="my-auto rounded-r-none z-10">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an account to start using DocHub
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => router.push("/login")}>
              Login
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 my-2">
            <div>
              <Label className="py-1.5" htmlFor="firstName">
                First Name
              </Label>
              <Input
                className="py-3.5"
                id="firstName"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <Label className="py-1.5" htmlFor="lastName">
                Last Name
              </Label>
              <Input
                className="py-3.5"
                id="lastName"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="my-4">
            <Label className="py-1.5" htmlFor="email">
              Email
            </Label>
            <Input
              className="py-3.5"
              id="email"
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="my-4">
            <Label className="py-1.5" htmlFor="password">
              Password
            </Label>
            <Input
              className="py-3.5"
              id="password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            variant="default"
            className="w-full py-4 font-bold text-md"
            onClick={createAccount}
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
      <Image
        src="/register.png"
        width={360}
        height={360}
        alt="a beautiful harmonic scenery"
        className="h-90 rounded-l-none rounded-md z-10"
      />
    </div>
  );
}
