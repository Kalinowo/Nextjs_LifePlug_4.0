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

export default function Header() {
  const [theme, setTheme] = useState("light");
  const [hamburger, setHambuger] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <div className="flex justify-between w-full py-5 px-5 z-50 text-gray-300">
        <div className="flex justify-center items-center">
          <Link
            href="/main"
            className="text-[36px] pr-5 text-gray-600 dark:dark gradient-text"
          >
            LifePlug
          </Link>
          <div className="hidden justify-center items-center gap-2 sm:flex">
            <NavLink hamburger={hamburger} />
          </div>
        </div>
        {/* toggle Hamburger */}
        <div
          className="flex justify-end items-center w-full text-4xl cursor-pointer sm:hidden"
          onClick={() => setHambuger((prev) => !prev)}
        >
          <CiSettings
            className={clsx("duration-500", { "rotate-90": hamburger })}
          />
        </div>
        {/* hamburger menu */}
        {hamburger && (
          <div className="fixed top-[80px] left-0 flex flex-col gap-5 p-8 text-2xl h-screen w-full bg-primary z-30 sm:hidden">
            <NavLink hamburger={hamburger} />
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
          </div>
        )}

        {/* toggleTheme Button */}
        <div className="hidden items-center sm:flex justify-end">
          <div>
            <form action={userLogOut}>
              <button className="p-5">
                <div className="hidden sm:block">Sign Out</div>
              </button>
            </form>
          </div>
          <button
            className="relative flex items-center w-[70px] h-[40px] rounded-full bg-gray-300"
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
    </>
  );
}
