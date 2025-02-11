import React from "react";
import { fetchUniqueYears } from "@/lib/data";
import AdminFunction from "@/components/main/AdminFunction";
import AnimeLists from "@/components/main/AnimeLists";
import Search from "@/components/main/Search";
import Pagination from "@/components/main/Pagination";
import QueryAnimeLists from "@/components/main/QueryAnimeLists";
import { auth } from "@/auth";

export default async function Main(props: {
  searchParams?: Promise<{
    query: string;
    year: string;
  }>;
}) {
  const session = await auth();

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const totalYears = await fetchUniqueYears();
  const currentYear = searchParams?.year || "";

  return (
    <div className="relative w-full px-5">
      {session?.user.role === "ADMIN" && <AdminFunction />}
      <Search placeholder="Search anime..." />
      {query === "" ? (
        <AnimeLists currentYear={currentYear} />
      ) : (
        <QueryAnimeLists query={query} />
      )}
      <Pagination
        totalYears={totalYears}
        query={query}
        currentYear={currentYear}
      />
    </div>
  );
}
