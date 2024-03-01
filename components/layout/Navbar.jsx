"use client"

import React from "react";
import Button from "../ui/Button";

const Navbar = ({ handleOnClick, content }) => {
  return (
    <nav className="flex justify-between items-center py-4 px-3 mb-8">
      <div className="text-3xl font-bold bg-gradient-to-r from-white to-pink-300 inline-block text-transparent bg-clip-text">DigiApps Solutions</div>
      <div>
        <Button handleOnClick={handleOnClick}>{content}</Button>
      </div>
    </nav>
  );
};

export default Navbar;
