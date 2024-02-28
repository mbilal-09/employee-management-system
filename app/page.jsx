"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Button from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  console.log(session);

  if (session?.data?._id) {
    if (session.data?.type === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/checkIn");
    }
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Button handleOnClick={signIn}>Sign In</Button>
    </div>
  );
}
