"use client";
import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import clsx from "clsx";
import { motion } from "framer-motion";
import { userLogOut } from "@/server/action";
import { VscSignOut } from "react-icons/vsc";

let savedTheme: any;
if (typeof window !== "undefined") {
  savedTheme = localStorage.getItem("theme");
}

export default function Header() {
  const [theme, setTheme] = useState("");
  const [hamburger, setHambuger] = useState(false);

  useEffect(() => {
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <div className="relative flex justify-between w-full pt-5 pb-3 px-5 z-50 text-gray-300 bg-primary">
        <div className="flex justify-center items-center">
          <Link
            href="/main"
            className="text-[36px] text-gray-600 dark:dark gradient-text"
          >
            LifePlug
          </Link>
          <div className="hidden justify-center items-center gap-2 mx-5 sm:flex">
            <NavLink hamburger={hamburger} setHamburger={setHambuger} />
          </div>
        </div>
        {/* toggle Hamburger */}
        <div className="flex justify-end items-center w-full text-4xl  sm:hidden">
          <CiSettings
            className={clsx("duration-500 cursor-pointer", {
              "rotate-90": hamburger,
            })}
            onClick={() => setHambuger((prev) => !prev)}
          />
        </div>
        {/* toggleTheme Button */}
        <div className="hidden items-center sm:flex justify-end ">
          <div>
            <form action={userLogOut}>
              <button className="flex justify-center items-center gap-1 p-5 hover:text-blue-600">
                <VscSignOut className="text-2xl" />
                <div className="hidden sm:block">Sign Out</div>
              </button>
            </form>
          </div>
          <button
            className="relative flex items-center w-[70px] h-[40px] rounded-full bg-gray-300 dark:bg-gray-400"
            onClick={toggleTheme}
          >
            <span className="absolute left-2 text-2xl text-black">
              <CiLight />
            </span>
            <span className="absolute right-2 text-2xl text-black">
              <CiDark />
            </span>
            <div
              className={
                theme === "light"
                  ? "absolute w-[30px] translate-x-[5px] h-[30px] bg-orange-400/50 rounded-full duration-500"
                  : "absolute w-[30px] translate-x-[35px] h-[30px] bg-black/50 rounded-full duration-500"
              }
            ></div>
          </button>
        </div>
      </div>
      {/* hamburger menu */}
      {hamburger && (
        <div className="absolute top-[86px] bottom-0 right-0 left-0 flex flex-col gap-5 pl-8 text-2xl w-full bg-primary text-gray-300 z-10 sm:hidden">
          <NavLink hamburger={hamburger} setHamburger={setHambuger} />
          {/* toggleTheme in hamburger */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 100,
            }}
            transition={{ ease: "easeOut", duration: 0.4 }}
          >
            <div className="flex sm:hidden">
              <button
                className="relative flex items-center h-[40px] w-[70px] rounded-full bg-gray-300"
                onClick={toggleTheme}
              >
                <span className="absolute left-2 text-2xl text-black">
                  <CiLight />
                </span>
                <span className="absolute right-2 text-2xl text-black">
                  <CiDark />
                </span>
                <div
                  className={
                    theme === "light"
                      ? "absolute w-[30px] translate-x-[5px] h-[30px] bg-orange-400/50 rounded-full duration-500"
                      : "absolute w-[30px] translate-x-[35px] h-[30px] bg-black/50 rounded-full duration-500"
                  }
                ></div>
              </button>
            </div>
          </motion.div>
          <div className="">
            <form action={userLogOut}>
              <button className="flex justify-center items-center gap-1 font-bold hover:text-blue-600">
                <VscSignOut className="text-4xl" />
                <div className="block text-lg sm:hidden">Sign Out</div>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
