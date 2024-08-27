import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const userComments = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      name: true,
      email: true,
      image: true,
      comments: true,
    },
  });
  if (!userComments || userComments.comments.length === 0) {
    return NextResponse.json({
      status: 404,
      data: "Not Found",
    });
  }
  return NextResponse.json({
    status: 200,
    data: userComments,
  });
}
