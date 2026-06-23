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
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async () => {
    try {
      const res = await axios.post("/api/auth/login", formData);
      if(res.status === 200) {
        router.push('/dashboard')
      }
      console.log(res.data);
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
      <div className="flex w-175 min-h-90">
        <Card className="rounded-r-none z-10 flex-1">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>
              Create an account to start using DocHub
            </CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => router.push("/register")}>
                Register
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
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
              onClick={loginUser}
            >
              Log In
            </Button>
          </CardFooter>
        </Card>
        <Image
          src="/register.png"
          width={360}
          height={360}
          alt="a beautiful harmonic scenery"
          className="h-90 rounded-l-none rounded-md z-10 flex-1"
        />
      </div>
    </div>
  );
}
