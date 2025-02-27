import { fetchAnimeByQuery } from "@/lib/data";
import AnimeContainer from "./ui/animeContainer";

interface animelistsProps {
  query: string;
}

export default async function QueryAnimeLists({ query }: animelistsProps) {
  const animes = await fetchAnimeByQuery(query);
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {animes.map((anime, idx) => (
        <AnimeContainer
          id={anime.id}
          engName={anime.engName}
          img={anime.img}
          title={anime.title}
        />
      ))}
    </div>
  );
}
