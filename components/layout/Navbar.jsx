"use client"

import React from "react";
import Button from "../ui/Button";

const Navbar = ({ handleOnClick, content }) => {
  return (
    <nav className="flex justify-between items-center py-4 px-3 mb-8">
      <div className="text-lg">DigiApps Solutions</div>
      <div>
        <Button handleOnClick={handleOnClick}>{content}</Button>
      </div>
    </nav>
  );
};

export default Navbar;
