"use client"

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const data = useSession()

  console.log('data--> ', data);
  return (
    <>
    <button onClick={() => signIn()}>SignIn</button>
    </>
  );
}
