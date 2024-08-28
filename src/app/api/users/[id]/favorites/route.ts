import prisma from "@/app/lib/prisma";
import { GameData } from "../../../../../../type";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const userFavorites = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      favoriteGames: true,
    },
  });
  if (!userFavorites || userFavorites.favoriteGames.length === 0) {
    return Response.json({
      status: 404,
      data: "Not Found",
    });
  }
  return Response.json({
    status: 200,
    data: userFavorites,
  });
}
