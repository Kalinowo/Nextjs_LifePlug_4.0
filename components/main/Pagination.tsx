"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Pagination({
  totalYears,
  query,
  currentYear,
}: {
  totalYears: string[];
  query: string;
  currentYear: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const checkYear = searchParams.get("year")?.toString();

  const handleYearParams = (direction: string) => {
    const params = new URLSearchParams(searchParams);
    if (!checkYear) params.set("year", totalYears[1]);
    if (checkYear) {
      const findIndex = totalYears.indexOf(checkYear);
      if (direction === "prev") {
        params.set("year", totalYears[findIndex + 1]);
      } else {
        params.set("year", totalYears[findIndex - 1]);
      }
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="flex justify-center items-center gap-10 text-gray-200 pb-5 pt-2">
        {totalYears[totalYears.length - 1] === currentYear ||
        query !== "" ? null : (
          <Link
            href={handleYearParams("prev")}
            className="cursor-pointer hover:text-blue-600"
          >
            上一年
          </Link>
        )}
        {totalYears[0] === currentYear || query !== "" ? null : (
          <Link
            href={handleYearParams("next")}
            className="cursor-pointer hover:text-blue-600"
          >
            下一年
          </Link>
        )}
      </div>
    </>
  );
}
