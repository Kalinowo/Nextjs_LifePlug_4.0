"use client";
import React, { useActionState } from "react";
import Input from "../main/ui/input";
import { IoCloseOutline } from "react-icons/io5";
import { pushAnimeEpisode } from "@/server/action";

const initialState = {
  message: "",
};

export default function EpisodeForm({
  id,
  setOpenForm,
}: {
  id: string;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, formAction] = useActionState(pushAnimeEpisode, initialState);
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="relative flex flex-col justify-center items-center bg-secondary px-5 pt-8 border-2 rounded-xl dark:border-gray-500 backdrop-blur-md">
        <div
          className="absolute top-1 right-1 text-2xl text-white hover:text-red-500 cursor-pointer"
          onClick={() => setOpenForm((prev) => !prev)}
        >
          <IoCloseOutline />
        </div>
        <form action={formAction} className="flex justify-center items-center">
          <input name="id" value={id} className="hidden" readOnly />
          <label htmlFor="episodeUrl" />
          <Input id="episodeUrl" placeholder="episodeUrl" name="episodeUrl" />
          <div className="flex justify-center items-center pb-2 ml-1">
            <button
              type="submit"
              className="text-gray-200 hover:text-red-500 font-bold"
            >
              Enter
            </button>
          </div>
        </form>
        <div className="pb-2 text-red-500">{state.message}</div>
      </div>
    </div>
  );
}
