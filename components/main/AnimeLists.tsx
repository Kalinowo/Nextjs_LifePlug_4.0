import { fetchAnimeByYear } from "@/lib/data";
import AnimeMap from "./ui/animeMap";
import { Suspense } from "react";

interface animelistsProps {
  currentYear: string;
}

export default async function AnimeLists({ currentYear }: animelistsProps) {
  const animes = await fetchAnimeByYear(currentYear);

  return (
    <div className="flex flex-col w-full">
      <div className="mx-auto text-6xl mb-5 text-gray-600 dark:dark gradient-text">
        {currentYear}動畫
      </div>
      <AnimeMap month="十月秋番" animes={animes} season="fall" />
      <AnimeMap month="七月夏番" animes={animes} season="summer" />
      <AnimeMap month="四月春番" animes={animes} season="spring" />
      <AnimeMap month="一月冬番" animes={animes} season="winter" />
    </div>
  );
}
