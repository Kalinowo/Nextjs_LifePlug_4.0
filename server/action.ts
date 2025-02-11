"use server";
import prisma from "@/lib/db";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function createUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;
  if (password !== repeatPassword) {
    return { message: "password doesn't match" };
  }

  const checkEmail = await prisma.user.findUnique({
    where: { email: email },
  });

  if (checkEmail) {
    return { message: "Email已存在" };
  }
  try {
    const hashedPassword = await hash(password, 12);

    const addUser = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
      },
    });
    console.log("User created successfully:", addUser);
  } catch (error) {
    console.log(error);
    return { message: "出錯" };
  }

  return { message: "成功" };
}

export async function createAnime(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const engName = formData.get("engName") as string;
  const img = formData.get("img") as string;
  const year = formData.get("year") as string;
  const season = formData.get("season") as string;
  const genre = formData.get("genre") as string;
  const director = formData.get("director") as string;
  const agent = formData.get("agent") as string;
  const producer = formData.get("producer") as string;
  const intro = formData.get("intro") as string;

  const addAnime = await prisma.anime.create({
    data: {
      title: title,
      engName: engName,
      img: img,
      year: year,
      season: season,
      genre: genre,
      director: director,
      agent: agent,
      producer: producer,
      intro: intro,
    },
  });
  revalidatePath("/main");
  return { message: "新增成功" };
}

export async function pushAnimeEpisode(prevState: any, formData: FormData) {
  const id = formData.get("id") as string;
  const episodeUrl = formData.get("episodeUrl") as string;
  const updatedUser = await prisma.anime.update({
    where: { id: id },
    data: {
      episode: {
        push: episodeUrl,
      },
    },
  });
  revalidatePath("/anime");
  return { message: "新增成功" };
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");
  const callbacks = formData.get("redirectTo");
  try {
    await signIn("credentials", {
      email: email,
      hashedPassword: password,
      // callbackUrl: callbacks,
      redirect: false,
    });
    redirect(`${callbacks}`);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function userLogOut() {
  await signOut({ redirectTo: "/" });
}

export async function removeAnimeEpisode(formData: FormData) {
  const title = formData.get("title") as string;
  const episodeIdx = formData.get("episodeIdx");
  const engName = formData.get("engName");
  const selectedAnime = await prisma.anime.findUnique({
    where: {
      title: title,
    },
  });
  selectedAnime?.episode.splice(Number(episodeIdx), 1);
  const updatedEpisode = selectedAnime?.episode;

  try {
    const updatedAnime = await prisma.anime.update({
      where: { title: title },
      data: {
        episode: updatedEpisode,
      },
    });
    revalidatePath(`/anime/${engName}`);
  } catch (err) {
    console.error(err);
  }
  redirect(`/anime/${engName}`);
}
