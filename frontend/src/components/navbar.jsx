import React from "react";

const Navbar = () => {
  return (
    <div className="flex border-[1px] justify-between h-[60px] py-[10px] px-[15px] mb-4">
      <div className="flex gap-x-[10px] items-center">
        <img className="h-[40px] w-[40px]" src="/assets/logo.png"></img>
        <p className="text-[20px] flex w-full font-bold">Nutrisafe</p>
      </div>
      <img
        className="h-[40px] w-[40px] rounded-full"
        src="/assets/profile.png"
      ></img>
    </div>
  );
};

export default Navbar;
