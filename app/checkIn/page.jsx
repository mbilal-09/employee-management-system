"use client";

import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const checkIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  const id = session?.data?._id;

  const handleSubmit = async () => {

    setDisabled(true);
    try {
      // Get the last check-in date from localStorage
      const lastCheckInDate = localStorage.getItem("lastCheckInDate");

      // Check if lastCheckInDate exists and if it's the same day
      if (
        !lastCheckInDate ||
        new Date(lastCheckInDate).getDate() !== new Date().getDate()
      ) {
        // Make the fetch request
        const response = await fetch(`/api/checkIn/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Update the last check-in date in localStorage
        localStorage.setItem("lastCheckInDate", new Date().toISOString());

        // Log the response data
        alert("Check-in Added");
      } else {
        // If already checked in today, display a message or handle it accordingly
        alert("Already checked in today");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="">
      {session?.data?.type === "employee" ? (
        <div>
        <Navbar handleOnClick={handleSignOut} content={"Sign Out"} />
        <div className="ps-3">
          <Button handleOnClick={handleSubmit} disabled={disabled}>
            Check In
          </Button>
        </div>
        </div>
      ) : session?.data?.type === "admin" ? (
        router.push("/dashboard")
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default checkIn;
