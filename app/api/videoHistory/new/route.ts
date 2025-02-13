import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      title,
      engName,
      img,
      episodeUrl,
      episode,
      length,
      currentTime,
    } = body;
    const check = await prisma.history.findFirst({
      where: {
        userId,
        title,
      },
    });

    if (check) {
      await prisma.history.update({
        where: { userId_title: { userId, title } },
        data: { currentTime },
      });
      return NextResponse.json("updated history");
    } else {
      await prisma.history.create({
        data: {
          userId,
          title,
          engName,
          img,
          episodeUrl,
          episode,
          length,
          currentTime,
        },
      });
      return NextResponse.json("created history");
    }
  } catch (error: any) {
    console.log(error, "POST_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
