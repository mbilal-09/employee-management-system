"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/employee");
  };

  return (
    <div>
      <nav className="flex justify-between items-center py-4 px-3 mb-8">
        <div className="text-lg">DigiApps Solutions</div>
        <div>
          <Button handleOnClick={handleOnClick}>Employees</Button>
        </div>
      </nav>
      
    </div>
  );
};

export default Dashboard;
