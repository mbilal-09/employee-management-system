"use client";

import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import SweetAlert from "@/components/ui/SweetAlert";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const CheckIn = () => {
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

        Swal.fire({
          title: 'Success!',
          text: 'Check In Added',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        
      } else {
        Swal.fire({
          title: 'Warning!',
          text: 'Already Checked In Today',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignOut = () => {
    Swal.fire({
      title: "Sign Out!",
      text: "Are you sure!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sign Out!",
          icon: "success"
        });
        signOut();
      }
    }); 
  };

  return (
    <div className="h-screen">
      {session?.data?.type === "employee" ? (
        <div className="h-screen relative">
          <div className="fixed top-0 w-[90%]">
            <Navbar handleOnClick={handleSignOut} content={"Sign Out"} />
          </div>
          <div className="flex justify-center w-full h-full items-center">
            <Button
              handleOnClick={handleSubmit}
              disabled={disabled}
              styles="text-xl"
            >
              Check In
            </Button>
          </div>
        </div>
      ) : session?.data?.type === "admin" ? (
        router.push("/dashboard")
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CheckIn;
