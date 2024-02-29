import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loader from "../ui/Loader";
import { useSession } from "next-auth/react";

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || session?.data?.type === "employee") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div>{session?.data?.type === "admin" ? { children } : <Loader />}</div>
  );
};

export default AuthWrapper;
