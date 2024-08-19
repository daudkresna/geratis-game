"use server";

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { User, validationUser } from "../lib/validationUser";

export async function signInAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
  console.log(username, password);
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

  const validation = validationUser({ data });
  if (!validation.success) {
    return { success: false, message: validation.error };
  } else {
    const bcrypt = require("bcrypt");
    const saltRounds: number = 10;
    const genSalt = await bcrypt.genSalt(saltRounds);
    const hashedPassword: string = await bcrypt.hash(password, genSalt);
    console.log("hashedPassword", hashedPassword);
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

export async function revalidateSignIn() {
  return revalidatePath("/");
}
