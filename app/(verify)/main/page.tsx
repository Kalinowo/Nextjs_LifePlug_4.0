import React from "react";
import { fetchUniqueYears } from "@/lib/data";
import AdminFunction from "@/components/main/AdminFunction";
import AnimeLists from "@/components/main/AnimeLists";
import Search from "@/components/main/Search";
import Pagination from "@/components/main/Pagination";
import QueryAnimeLists from "@/components/main/QueryAnimeLists";
import { auth } from "@/auth";
import { Suspense } from "react";
import CustomLoading from "@/components/ui/CustomLoading";

export default async function Main(props: {
  searchParams?: Promise<{
    query: string;
    year: string;
  }>;
}) {
  const [session, searchParams, totalYears] = await Promise.all([
    auth(),
    props.searchParams,
    fetchUniqueYears(),
  ]);
  const query = searchParams?.query || "";
  const currentYear = searchParams?.year || totalYears[0] || "";

  return (
    <div className="relative w-full px-5">
      {session?.user.role === "ADMIN" && <AdminFunction />}
      <Suspense fallback={<div>Loading...</div>}>
        <Search placeholder="Search anime..." />
      </Suspense>
      {query === "" ? (
        <Suspense key={currentYear} fallback={<CustomLoading />}>
          <AnimeLists currentYear={currentYear} />
        </Suspense>
      ) : (
        <QueryAnimeLists query={query} />
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Pagination
          totalYears={totalYears}
          query={query}
          currentYear={currentYear}
        />
      </Suspense>
    </div>
  );
}
