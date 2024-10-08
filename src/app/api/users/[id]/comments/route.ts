import prisma from "@/app/lib/prisma";

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
    return Response.json({
      status: 404,
      data: "Not Found",
    });
  }
  return Response.json({
    status: 200,
    data: userComments,
  });
}
