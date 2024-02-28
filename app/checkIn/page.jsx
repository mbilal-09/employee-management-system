"use client";

import Button from "@/components/ui/Button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const checkIn = () => {
  const data = useSession();
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (data.status === "unauthenticated") {
      router.push("/");
    }
  }, [data, router]);

  const id = data?.data?.data?._id;

  const handleSubmit = async () => {
    try {
      // Get the last check-in date from localStorage
      const lastCheckInDate = localStorage.getItem("lastCheckInDate");

      // Check if lastCheckInDate exists and if it's the same day
      if (!lastCheckInDate || new Date(lastCheckInDate).getDate() !== new Date().getDate()) {
        // Make the fetch request
        const response = await fetch(`/api/checkIn/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Update the last check-in date in localStorage
        localStorage.setItem("lastCheckInDate", new Date().toISOString());

        // Disable the button
        setDisabled(true);

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
  }

  return (
    <div className="flex justify-around items-center h-screen">
      <Button handleOnClick={handleSubmit} disabled={disabled}>Check In</Button>
      <Button handleOnClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default checkIn;
