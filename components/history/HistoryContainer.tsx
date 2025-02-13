import { fetchUserAnimeHistory } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";

export default async function HistoryContainer({ session }: any) {
  const userHistory = await fetchUserAnimeHistory(session.user.id);

  const toHHMMSS = (time: any): string => {
    let sec_num = parseInt(time, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    let minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();
    let secondsStr = seconds < 10 ? "0" + seconds : seconds.toString();

    if (hours > 0) {
      let hoursStr = hours < 10 ? "0" + hours : hours.toString();
      return hoursStr + "時" + minutesStr + "分" + secondsStr + "秒";
    } else {
      return minutesStr + "分" + secondsStr + "秒";
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {userHistory?.map((history, idx) => (
        <div
          key={history.title}
          className="relative flex w-full rounded-2xl overflow-hidden text-textPrimary dark:text-gray-300 dark:border-2 dark:border-gray-300"
        >
          <div className="absolute w-full h-full z-[-1] opacity-20 grayscale-[50%] sm:grayscale-0 sm:opacity-100 sm:block sm:relative sm:basis-[40%] sm:pb-[28%] md:pb-[22%] lg:pb-[17%] xl:pb-[14%]">
            <Image
              className="absolute"
              src={history.img}
              alt="anime pic"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col flex-grow sm:basis-[60%] bg-secondary py-1 px-3 truncate">
            <div className="[textAlign:center] text-textPrimary text-2xl dark:dark gradient-text font-bold truncate">
              <span className="dark:dark gradient-text">{history.title}</span>
            </div>
            <div className="flex flex-col gap-1 text-xl">
              <div className="font-bold">上次觀看：</div>
              <Link
                href={{
                  pathname: `/anime/${history.engName}`,
                  query: {
                    episode: history.episodeUrl,
                    currentTime: history.currentTime,
                  },
                }}
                className="hover:text-blue-600"
              >
                <div>
                  第{history.episode.indexOf(history.episodeUrl) + 1}集｜
                  {toHHMMSS(history.currentTime)}
                </div>
              </Link>
              <div>最新集數：{history.length}</div>
              {history.episode.indexOf(history.episodeUrl) + 1 <
                history.length && (
                <div className="flex items-center text-green-600">
                  <TbPlayerSkipForwardFilled />
                  <Link
                    href={{
                      pathname: `/anime/${history.engName}`,
                      query: {
                        episode:
                          history.episode[
                            history.episode.indexOf(history.episodeUrl) + 1
                          ],
                      },
                    }}
                    className="relative left-0 cursor-pointer text-green-600 font-bold hover:left-5 duration-300"
                  >
                    觀看下一集
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {!userHistory.length && (
        <div className="flex justify-center items-center text-4xl text-textPrimary dark:text-gray-300">
          No History Yet
        </div>
      )}
    </div>
  );
}
