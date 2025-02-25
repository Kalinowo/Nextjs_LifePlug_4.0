import React from "react";
import Image from "next/image";
import Link from "next/link";

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

export default async function AnimeMap({
  month,
  animes,
  season,
}: AnimeMapProps) {
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
              <Link
                key={anime.id}
                href={`/anime/${anime.engName}`}
                className="relative flex flex-col border-2 border-black rounded-xl overflow-hidden basis-[calc(50%-8px)] md:basis-[calc(25%-6px)] shadow-xl group"
              >
                <div>
                  <div className="relative h-0 w-full bg-no-repeat basis-2/3 pb-[60%] overflow-hidden">
                    <Image
                      className="absolute top-0 w-full group-hover:scale-110 duration-300"
                      src={anime.img}
                      alt="anime_pic"
                      style={{ objectFit: "cover" }}
                      fill
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcngwAAZcA/EHkNJYAAAAASUVORK5CYII="
                    />
                  </div>
                  <div
                    className="absolute bottom-0 whitespace-nowrap text-ellipsis overflow-hidden
                  border-t-2 border-black
                  text-gray-800
                  dark:text-gray-200
                bg-gray-200 dark:bg-gray-500 p-1 font-bold w-full group-hover:whitespace-normal group-hover:bg-white/80"
                  >
                    {anime.title}
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </>
  );
}
