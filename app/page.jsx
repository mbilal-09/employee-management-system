"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Button from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();


  if (session?.data?._id) {
    if (session.data?.type === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/checkIn");
    }
    return null;
  }

  const handleSingIn = () => {
    signIn();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Button handleOnClick={handleSingIn} styles="px-20 py-3 text-xl">
        Sign In
      </Button>
    </div>
  );
}
