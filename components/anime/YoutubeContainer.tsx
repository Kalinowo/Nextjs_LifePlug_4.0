"use client";
import React from "react";
import YouTube from "react-youtube";

export default function YoutubeContainer({
  episodeArr,
  episodeUrl,
  anime,
  session,
  timeStamp,
}: any) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      //只接受整數
      start: timeStamp,
    },
  };

  const youtubeState = async (e: any) => {
    // const duration = e.target.getDuration();
    const currentTime = Math.floor(e.target.getCurrentTime());

    let userId = session.user.id;
    let title = anime.title;
    let engName = anime.engName;
    let img = anime.img;
    let episode = episodeArr;
    let length = anime.episode.length;

    switch (e.data) {
      case -1:
        console.log("未啟動");
        break;
      case 0:
        console.log("已結束");
        break;
      case 1:
        // 播放
        try {
          const res = await fetch("/api/videoHistory/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              title,
              engName,
              img,
              episodeUrl,
              episode,
              length,
              currentTime,
            }),
          });
          console.log(res);
        } catch (error) {
          console.error("更新失敗", error);
        }
        break;
      case 2:
        //  暫停
        try {
          const res = await fetch("/api/videoHistory/new", {
            method: "POST",
            body: JSON.stringify({
              userId,
              title,
              engName,
              img,
              episodeUrl,
              episode,
              length,
              currentTime,
            }),
          });
          console.log(res);
        } catch (error) {
          console.error("更新失敗", error);
        }
        break;
      case 3:
        console.log("緩衝");
        break;
      case 5:
        console.log("影片已播放");
        break;
      default:
        console.log("錯誤");
    }
  };
  return (
    <div className="relative flex justify-center items-center h-[60vh] w-full">
      {!episodeUrl ? (
        <div className="text-textPrimary text-8xl">No Video Yet</div>
      ) : (
        <YouTube
          videoId={episodeUrl}
          className="youtubePlayer"
          opts={opts}
          onStateChange={youtubeState}
        />
      )}
    </div>
  );
}
