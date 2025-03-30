import React from "react";
import AnimeContainer from "./animeContainer";

interface animeProps {
  id: string;
  title: string;
  engName: string;
  img: string;
  year: string;
  season: string;
  genre: string;
  director: string;
  agent: string;
  producer: string;
}

interface AnimeMapProps {
  month?: string;
  animes: animeProps[] | undefined;
  season: string;
}

export default function AnimeMap({ month, animes, season }: AnimeMapProps) {
  // filter相同年份和對應季節的動畫
  const filterLists = animes?.filter((anime) => anime.season === season);

  return (
    <>
      {filterLists?.length !== 0 && (
        <div className="mx-auto text-gray-300 text-2xl font-bold py-5">
          {month}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {filterLists?.length === 0
          ? null
          : filterLists?.map((anime, idx) => (
              //   anime container↓
              <AnimeContainer
                key={anime.id}
                engName={anime.engName}
                img={anime.img}
                title={anime.title}
              />
            ))}
      </div>
    </>
  );
}
