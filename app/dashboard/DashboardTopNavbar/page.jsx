"use client"

import { Drawer } from "@mui/material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { MenuData } from "../DashboardAsidebar/page";

const DashboardTopNav = () => {
  return (
    <div className="sticky top-0 bg-slate-400 ">
      <div className="flex justify-center py-5 space-x-5">
        <Link href="#">
          Home
        </Link>
        <Link href="#">
          About
        </Link>
        <Link href="#">
          Contact
        </Link>
        <div className="pl-16">
        <MobileDashboardDrawer/>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardTopNav;


export const MobileDashboardDrawer = () => {
  const [open, setOpen] = useState(false);


  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(!open)}>
        <div className=" w-72 pt-3  bg-[#EDF3F3] h-full">
          <div className="flex justify-between items-center border-b pb-2">
            <Link href="/" className="w-20 pl-[20px]">
              {/* <Image src={logo} alt="" /> */}
            </Link>
            <CloseIcon
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>

          <MenuData/>
        </div>
      </Drawer>
    </div>
  );
};
