import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchUniqueAnime } from "@/lib/data";
import YoutubeContainer from "@/components/anime/YoutubeContainer";
import prisma from "@/lib/db";
import EpisodeBtn from "@/components/anime/EpisodeBtn";
import AdminAddEpisode from "@/components/anime/AdminAddEpisode";
import { auth } from "@/auth";
import { IoIosInformationCircleOutline } from "react-icons/io";

const getAnimesNames = async () => {
  const res = await prisma?.anime.findMany({
    select: {
      engName: true,
    },
  });
  return res;
};

export default async function AnimePage(props: {
  searchParams?: Promise<{
    episode: string;
    currentTime: number;
  }>;
  params: Promise<{
    id: string;
  }>;
}) {
  const route = await props.params;
  const searchParams = await props.searchParams;
  const getAllAnimesNames = await getAnimesNames();
  const selectedAnime = await fetchUniqueAnime(decodeURIComponent(route.id));
  const session = await auth();

  let episodeDefault;
  if (selectedAnime) {
    episodeDefault = selectedAnime[0].episode[0];
  }
  // 透過url去設定episode || deafult array[0] episode
  const episode = searchParams?.episode || episodeDefault;
  const prevTimeStamp = searchParams?.currentTime || 0;
  const allowedSlugs = getAllAnimesNames?.map((route) =>
    encodeURIComponent(route.engName)
  );

  console.log(prevTimeStamp);

  if (!allowedSlugs?.includes(route.id)) {
    notFound();
  }

  return (
    <div className="relative w-full">
      {selectedAnime?.map((anime, idx) => (
        <div
          key={anime.engName}
          className="relative flex flex-col w-full gap-2"
        >
          <span className="flex justify-center items-center gap-2 mx-auto text-4xl text-gray-300 dark:dark gradient-text">
            {anime.title}
            <span className=" text-white hover:text-red-600 group">
              <IoIosInformationCircleOutline />
              <div className="absolute hidden left-0 top-10 bg-gray-500 text-gray-300 rounded-xl mx-5 p-2 group-hover:flex flex-wrap border-2 dark:border-gray-500 backdrop-blur-3xl z-50">
                {anime.intro}
              </div>
            </span>
          </span>

          <YoutubeContainer
            anime={anime}
            session={session}
            episodeArr={selectedAnime[0].episode}
            episodeUrl={episode}
            timeStamp={Number(prevTimeStamp)}
          />
          <div className="flex gap-2 px-2 pt-1">
            <Suspense fallback={<div>Loading...</div>}>
              <EpisodeBtn
                totalEpisode={anime.episode}
                title={anime.title}
                engName={anime.engName}
                episodeUrl={episode}
                isAdmin={session?.user.role}
              />
            </Suspense>
            {session?.user.role === "ADMIN" && (
              <AdminAddEpisode id={anime.id} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
