"use client";
import React, { useActionState } from "react";
import Input from "./ui/input";
import { createAnime } from "@/server/action";
import { IoCloseOutline } from "react-icons/io5";

const initialState = {
  message: "",
};

export default function AnimeForm({
  setOpenForm,
}: {
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, formAction] = useActionState(createAnime, initialState);
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 px-5">
      <div className="relative flex flex-col justify-center items-center bg-secondary px-5 pt-8 pb-2 border-2 dark:border-gray-500 rounded-xl backdrop-blur-md">
        <div
          className="absolute top-1 right-1 text-2xl text-white hover:text-red-500 cursor-pointer"
          onClick={() => setOpenForm((prev) => !prev)}
        >
          <IoCloseOutline />
        </div>
        <form
          className="flex flex-col justify-center items-center"
          action={formAction}
        >
          <div className="pb-3 text-3xl text-gray-200">新增動畫</div>
          <div className="flex flex-wrap space-x-1">
            <Input id="title" placeholder="title" name="title" />
            <Input id="engName" placeholder="engName" name="engName" />
            <Input id="img" placeholder="img" name="img" />
            <Input id="year" placeholder="year" name="year" />
            <Input id="season" placeholder="season" name="season" />
            <Input id="genre" placeholder="genre" name="genre" />
            <Input id="director" placeholder="director" name="director" />
            <Input id="agent" placeholder="agent" name="agent" />
            <Input id="producer" placeholder="producer" name="producer" />
            <label htmlFor="intro"></label>
            <textarea
              className="basis-[100%] px-2 py-2 mb-2 bg-transparent border-2 rounded-lg text-textSecondary placeholder-gray-200 dark:placeholder-red-700
              dark:border-transparent dark:bg-gray-700/50"
              id="intro"
              placeholder="intro"
              name="intro"
            />
            {state?.message && (
              <div className="flex justify-center items-center w-full mb-2 font-bold text-red-500">
                {state.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-300 rounded-lg w-full hover:bg-blue-500 hover:text-white
            dark:bg-gray-300 dark:hover:bg-gray-700"
          >
            送出
          </button>
        </form>
      </div>
    </div>
  );
}
