"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import { removeAnimeEpisode } from "@/server/action";

export default function EpisodeBtn({
  totalEpisode,
  title,
  engName,
  episodeUrl,
  isAdmin,
}: {
  totalEpisode: string[];
  title: string;
  engName: string;
  episodeUrl: string | undefined;
  isAdmin: string | undefined;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (episodeUrl) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("episode", episodeUrl);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [episodeUrl]);

  const handleEpisodeUrl = (episodeUrl: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("episode", episodeUrl);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-wrap justify-center items-center gap-4">
      {totalEpisode.map((url, idx) => (
        <div key={url} className="relative">
          {isAdmin === "ADMIN" && (
            <div className="absolute right-[-8px] top-[-8px] flex justify-center items-center bg-red-500 rounded-sm group">
              <div className="flex justify-center items-center w-full h-[18px] overflow-hidden">
                <form
                  action={removeAnimeEpisode}
                  className="flex justify-center items-center w-0  duration-100 z-0 cursor-pointer group-hover:w-[50px] group-hover:pl-1"
                >
                  <input type="hidden" name="title" value={title} />
                  <input type="hidden" name="episodeIdx" value={idx} />
                  <input type="hidden" name="engName" value={engName} />
                  <button
                    type="submit"
                    className="text-[13px] hover:text-white"
                  >
                    remove
                  </button>
                </form>
                <div className="z-10 bg-red-500">
                  <IoCloseOutline />
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => handleEpisodeUrl(url)}
            className={clsx(
              " min-w-[55px] h-[40px] rounded-lg",
              episodeUrl === url ? "bg-blue-300" : "bg-gray-300"
            )}
          >
            {idx + 1}
          </button>
        </div>
      ))}
    </div>
  );
}
