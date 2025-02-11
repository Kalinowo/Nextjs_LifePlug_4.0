"use client";
import React, { useState, useActionState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import EpisodeForm from "./EpisodeForm";

export default function AdminAddEpisode({ id }: { id: string }) {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <div
        className="flex justify-center items-center text-4xl text-textPrimary hover:text-red-500 cursor-pointer"
        onClick={() => setOpenForm((prev) => !prev)}
      >
        <CiCirclePlus />
      </div>
      {openForm && <EpisodeForm id={id} setOpenForm={setOpenForm} />}
    </>
  );
}
