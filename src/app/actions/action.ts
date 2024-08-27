"use server";

import prisma from "../lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { User, validationUser } from "../lib/validationUser";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export async function signInAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
}

export async function signUpAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data: User = {
    name: name,
    email: email,
    password: password,
  };

  // USER VALIDATION
  const validation = validationUser({ data });

  //CHECK VALIDATION
  if (!validation.success) {
    return { success: false, message: validation.error };
  } else {
    const bcrypt = require("bcrypt");
    const saltRounds: number = 10;
    const genSalt = await bcrypt.genSalt(saltRounds);
    const hashedPassword: string = await bcrypt.hash(password, genSalt);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword: hashedPassword,
      },
    });
    if (!newUser) {
      return { success: false, message: "Account creation failed" };
    }
    return { success: true, message: "Account created successfully" };
  }
}

export async function addToCollectionAction(formData: FormData) {
  const { gameId, userId, gameName, gameThumbnail } = Object.fromEntries(
    formData,
  ) as {
    gameId: string;
    userId: string;
    gameName: string;
    gameThumbnail: string;
  };

  await prisma.favoriteGame.create({
    data: {
      gameName,
      gameId,
      gameThumbnail,
      userId,
    },
  });
  revalidatePath(`/game/${gameId}`);
}

export async function addCommentAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin");
  } else {
    const comment = formData.get("comment") as string;
    const userId = formData.get("userId") as string;
    const gameId = formData.get("gameId") as string;
    const gameName = formData.get("gameName") as string;
    const newComment = await prisma.comment.create({
      data: {
        userId: userId,
        gameId: gameId,
        comment: comment,
        gameName: gameName,
      },
    });
    await revalidateTag("comment");
    return newComment;
  }
}

export async function revalidateSignIn() {
  return revalidatePath("/");
}
