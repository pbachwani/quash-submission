import React from "react";

const Navbar = () => {
  return (
    <nav className="top-0 min-h-20 w-full flex items-center bg-[#1C1F22] justify-between px-6">
      <div className="">
        <span className="text-[#9E9E9E]">Test Suites</span>
        <span>{" > "}</span>
        <span>QS-034 - New Onboarding Flow</span>
      </div>
      <span>...</span>
    </nav>
  );
};

export default Navbar;
