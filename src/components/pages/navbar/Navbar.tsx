"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Flow from "@/assets/flow2.png";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/app/store/store";
import { Theme } from "@/components/theme";
import { clearUser } from "@/app/store/slices/userSlice";
import { signoutApi } from "@/api";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userState = useSelector((state: RootState) => state.user);
  const { user } = userState;

  const dispatch = useDispatch();
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    dispatch(clearUser());
    try {
      await signoutApi()
      navigate.push("/login");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="border-b-2 rounded-b-md border-slate-700 padding-horizontal">
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate.push("/")}
        >
          <Image src={Flow} alt="Flow Zone Logo" className="h-16 w-16" />
          <h1 className="text-lg font-bold">Task Manager</h1>
        </div>

        <div className="flex">
          {user && (
            <div className="flex items-center mr-4">
              <p className="sm:flex">
                <span className="sm:block hidden">Welcome, </span>
                {user.username}!
              </p>
            </div>
          )}
          <div className="sm:block hidden">
            <Theme />
          </div>
          <div>
            <div className="flex">
              {user ? (
                <div className="flex items-center justify-center relative">
                  <div
                    className="flex items-center justify-center border-2 ml-4 h-10 w-10 rounded-full hover:bg-gray-100 cursor-pointer"
                    onClick={handleToggle}
                  >
                    <FaUser className="text-lg text-gray-500" />
                  </div>
                  {isOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-slate-900 text-white font-medium rounded-md border-gray border-2 z-10">
                      <ul>
                        <li className="block sm:hidden relative">
                          <div className="flex items-center gap-4">
                            <Theme />
                            <div className="absolute left-12">Theme</div>
                          </div>
                        </li>
                        <li
                          className="py-2 px-4 hover:bg-slate-700 cursor-pointer"
                          onClick={() => {
                            handleItemClick();
                            handleLogout();
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <FiLogOut size={20} />
                            <button>Logout</button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Link href={"/login"}>
                    <Button
                      variant="default"
                      className="lg:hidden block px-4 py-2 text-sm font-medium ml-4 flex"
                    >
                      <FaUser className="mr-2" />
                      Create Account
                    </Button>
                  </Link>
                  <Link href={"/login"}>
                    <Button
                      variant="default"
                      className="lg:block hidden lg:flex lg:px-4 lg:py-2 lg:text-sm lg:font-medium lg:ml-4"
                    >
                      <FaUser className="mr-2" />
                      Login / Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
