"use client";
import React, { useState } from "react";
import AnimeForm from "./AnimeForm";

export default function AdminFunction() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <div className="relative w-full">
        <button
          onClick={() => setOpenForm((prev) => !prev)}
          className="p-5 text-gray-300 hover:text-red-600"
        >
          新增動畫
        </button>
      </div>
      {openForm && <AnimeForm setOpenForm={setOpenForm} />}
    </>
  );
}
