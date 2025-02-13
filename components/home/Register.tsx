"use client";
import React, { useActionState } from "react";
import { createUser } from "@/server/action";

const initialState = {
  message: "",
};

export default function Register() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <div>
      <div className="flex justify-center items-center text-4xl w-full py-3">
        註冊會員
      </div>
      <form action={formAction}>
        <div className="flex flex-col gap-1 mb-3 justify-center items-center">
          <label htmlFor="e-mail" />
          <input
            id="e-mail"
            name="email"
            className="px-2 py-1 rounded-xl"
            type="email"
            placeholder="E-mail"
            required
          />
          <label htmlFor="password" />
          <input
            id="password"
            name="password"
            className="px-2 py-1 rounded-xl"
            type="password"
            placeholder="Password"
            required
          />
          <label htmlFor="repeat-password" />
          <input
            id="repeatPassword"
            name="repeatPassword"
            className="px-2 py-1 rounded-xl"
            type="password"
            placeholder="Repeat-password"
            required
          />
          {state?.message && (
            <div className="text-sm text-red-500 font-bold mt-2">
              {state.message}
            </div>
          )}
        </div>
        <div className="flex gap-1 pb-2">
          <button
            type="submit"
            className="bg-blue-400 flex-grow rounded-sm hover:text-white"
          >
            註冊
          </button>
        </div>
      </form>
    </div>
  );
}
