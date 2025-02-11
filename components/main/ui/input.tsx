import React from "react";

interface InputProps {
  id: string;
  name: string;
  placeholder: string;
}

export default function Input({ id, name, placeholder }: InputProps) {
  return (
    <>
      <label htmlFor={id} />
      <input
        className="basis-[calc(50%-8px)] px-2 py-1 mb-2 bg-transparent border-2 rounded-lg text-textSecondary placeholder-gray-200 dark:placeholder-red-700
        dark:border-transparent
        dark:bg-gray-700/50"
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
}
