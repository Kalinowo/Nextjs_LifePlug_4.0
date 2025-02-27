"use client";
import React from "react";
import { ImSpinner2 } from "react-icons/im";

function CustomLoading() {
  return (
    <div className="relative top-[200px] flex justify-center items-center mx-auto max-w-7xl">
      <div className="text-[50px] text-textPrimary">
        <div className="flex justify-center items-center text-textPrimary">
          <ImSpinner2 className="animate-spin origin-center" />
        </div>
        Loading...
      </div>
    </div>
  );
}

export default CustomLoading;
