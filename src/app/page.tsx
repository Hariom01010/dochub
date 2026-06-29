import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('dochub')
  const href =  token ? "/workspace": "/login"

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="relative flex flex-col items-center my-auto z-10">
        <h1 className="font-unkempt font-bold text-5xl pb-2 text-center">
          Everything your team needs.
          <br /> One place.
        </h1>
        <h2 className="text-muted-foreground text-sm">
          Organize documents, capture knowledge, and collaborate without the
          chaos.
        </h2>
        <Button
          variant="default"
          className="cursor-pointer rounded-full bg-black hover:bg-black/70 border border-grey/10 px-6 py-5 my-4 text-md"
        >
          <Link href={href}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
