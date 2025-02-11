"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Register from "./Register";
import Login from "./Login";
import { IoCloseOutline } from "react-icons/io5";

type FormTabType = "signin" | "register";
interface LoginFormProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ setOpenLogin }: LoginFormProps) {
  const [formTab, setFormTab] = useState("signin");

  return (
    <div className="absolute flex justify-center items-center bg-slate-500/50 w-full h-[723.5px] z-50">
      <div className="flex flex-col items-center border-2 border-black w-[300px] bg-gray-200 z-50">
        <div className="flex gap-1 items-start w-full bg-gray-300">
          <div
            className={clsx("cursor-pointer p-2 whitespace-nowrap", {
              "bg-gray-200": formTab === "signin",
            })}
            onClick={() => setFormTab("signin")}
          >
            Sign-in
          </div>
          <div
            className={clsx("cursor-pointer p-2 whitespace-nowrap", {
              "bg-gray-200": formTab === "register",
            })}
            onClick={() => setFormTab("register")}
          >
            Register
          </div>
          <span className="flex justify-end items-center text-2xl p-2 flex-grow">
            <IoCloseOutline
              onClick={() => setOpenLogin((prev) => !prev)}
              className="cursor-pointer hover:text-red-600"
            />
          </span>
        </div>
        {formTab === "signin" && <Login setOpenLogin={setOpenLogin} />}
        {formTab === "register" && <Register />}
      </div>
    </div>
  );
}
