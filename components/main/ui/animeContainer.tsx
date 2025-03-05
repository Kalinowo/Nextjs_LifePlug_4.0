import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AnimeContainerProps {
  engName: string;
  img: string;
  title: string;
}

export default function AnimeContainer({
  engName,
  img,
  title,
}: AnimeContainerProps) {
  return (
    <Link
      href={`/anime/${engName}`}
      className="relative flex flex-col border-2 border-black rounded-xl overflow-hidden basis-[calc(50%-8px)] md:basis-[calc(25%-6px)] shadow-xl group"
    >
      <div>
        <div className="relative h-0 w-full bg-no-repeat basis-2/3 pb-[60%] overflow-hidden">
          <Image
            className="absolute top-0 w-full group-hover:scale-110 duration-300"
            src={img}
            alt="anime_pic"
            style={{ objectFit: "cover" }}
            fill
            sizes="100vh"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcngwAAZcA/EHkNJYAAAAASUVORK5CYII="
          />
        </div>
        <div
          className="absolute bottom-0 whitespace-nowrap text-ellipsis overflow-hidden
    border-t-2 border-black
    text-gray-800
    dark:text-gray-200
  bg-gray-200 dark:bg-gray-500 p-1 font-bold w-full group-hover:whitespace-normal group-hover:bg-white/80 dark:group-hover:text-gray-800"
        >
          {title}
        </div>
      </div>
    </Link>
  );
}
