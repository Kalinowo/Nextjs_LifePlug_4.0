"use client";
import React from "react";
import { useActionState } from "react";
import { authenticate } from "@/server/action";
import { useSearchParams } from "next/navigation";

interface LoginFormProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setOpenLogin }: LoginFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/main";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <div>
      <div className="flex justify-center items-center text-4xl w-full py-3">
        會員登入
      </div>
      <form action={formAction} className="">
        <div className="flex flex-col gap-1 mb-3 justify-center items-center">
          <label htmlFor="e-mail" />
          <input
            id="e-mail"
            name="email"
            className="px-2 py-1 rounded-xl"
            type="email"
            placeholder="E-mail"
          />
          <label htmlFor="password" />
          <input
            id="password"
            name="password"
            className="px-2 py-1 rounded-xl"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex gap-1 pb-2">
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button
            className="basis-2/3 bg-blue-400 rounded-sm hover:text-white"
            aria-disabled={isPending}
          >
            登入
          </button>
          <button
            className="basis-1/3 bg-gray-400 rounded-sm hover:text-white"
            onClick={() => setOpenLogin((prev) => !prev)}
          >
            取消
          </button>
        </div>
        {errorMessage && (
          <>
            {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </form>
    </div>
  );
}
