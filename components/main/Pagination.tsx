"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

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
  const router = useRouter();
  const checkYear = searchParams.get("year")?.toString();

  useEffect(() => {
    if (currentYear === "") {
      const params = new URLSearchParams(searchParams);
      params.set("year", totalYears[0]);
      router.push(`${pathname}?${params.toString()}`);
      return;
    }
  }, [currentYear]);

  const handlePrevYear = () => {
    const params = new URLSearchParams(searchParams);
    if (checkYear) {
      const findIndex = totalYears.indexOf(checkYear);
      params.set("year", totalYears[findIndex + 1]);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleNextYear = () => {
    const params = new URLSearchParams(searchParams);
    if (checkYear) {
      const findIndex = totalYears.indexOf(checkYear);
      params.set("year", totalYears[findIndex - 1]);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-10 text-gray-200 pb-5 pt-2">
        {totalYears[totalYears.length - 1] === currentYear ||
        query !== "" ? null : (
          <div
            onClick={handlePrevYear}
            className="cursor-pointer hover:text-blue-600"
          >
            上一年
          </div>
        )}
        {totalYears[0] === currentYear || query !== "" ? null : (
          <div
            onClick={handleNextYear}
            className="cursor-pointer hover:text-blue-600"
          >
            下一年
          </div>
        )}
      </div>
    </>
  );
}
