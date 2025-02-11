import Link from "next/link";
import Image from "next/image";
import { fetchAnimeByQuery } from "@/lib/data";

interface animelistsProps {
  query: string;
}

export default async function QueryAnimeLists({ query }: animelistsProps) {
  const animes = await fetchAnimeByQuery(query);
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {animes.map((anime, idx) => (
        <Link
          key={anime.id}
          href={`/anime/${anime.engName}`}
          className="flex flex-col border-2 border-black rounded-xl overflow-hidden basis-[calc(50%-8px)] md:basis-[calc(25%-6px)] shadow-xl group"
        >
          <div>
            <div className="relative h-0 w-full bg-no-repeat basis-2/3 pb-[50%] overflow-hidden">
              <Image
                className="absolute top-0 w-full group-hover:scale-110 duration-300"
                src={anime.img}
                alt="anime_pic"
                style={{ objectFit: "cover" }}
                fill
                priority
              />
            </div>
            <div
              className="whitespace-nowrap text-ellipsis overflow-hidden
                  border-t-2 border-black
                  text-gray-800
                  dark:text-gray-200
                bg-gray-200 dark:bg-gray-500 p-1 font-bold"
            >
              {anime.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
