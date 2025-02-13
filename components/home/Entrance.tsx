"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import clsx from "clsx";

export default function Entrance() {
  const [openLogin, setOpenLogin] = useState<boolean>(true);

  return (
    <>
      <div className="relative flex flex-col items-center border-2 border-black rounded-md w-[80%] sm:w-[450px] bg-gray-500">
        <div className="responsive-text flex justify-center items-center p-6 sm:text-8xl text-white">
          <span className="flex justify-center items-center">LifePlug</span>
        </div>
        <div
          className="relative border-2 border-black w-[80%] h-[30px] mb-4 overflow-hidden group cursor-pointer"
          onClick={() => setOpenLogin((prev) => !prev)}
        >
          <div className="absolute flex justify-center items-center z-10 w-full">
            登入
          </div>
          <div
            className={clsx(
              "absolute top-0 bg-green-200 w-full h-full group-hover:left-0 duration-300 z-5 pointer-events-none",
              {
                "left-[-400px]": !openLogin,
                "left-0": openLogin,
              }
            )}
          ></div>
        </div>
      </div>
      {openLogin && <LoginForm setOpenLogin={setOpenLogin} />}
    </>
  );
}
