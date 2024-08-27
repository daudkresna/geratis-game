import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { GameComments } from "../../../../../../type";

export type CommentResponse = {
  status: number;
  data: GameComments[];
};
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const comments = await prisma.comment.findMany({
    where: {
      gameId: params.id,
    },
    select: {
      id: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  if (comments.length > 0) {
    return NextResponse.json({
      status: 200,
      data: comments,
    });
  } else {
    return NextResponse.json({
      status: 404,
      data: "Not Found",
    });
  }
}
