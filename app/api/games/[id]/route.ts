import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET DETAIL GAME
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const game = await prisma.game.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(game);
}

// UPDATE GAME
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const updated = await prisma.game.update({
    where: { id: Number(params.id) },
    data: {
      name: body.name,
      genre: body.genre,
      rating: Number(body.rating),
      image: body.image || null,
      description: body.description || null,
    },
  });

  return NextResponse.json(updated);
}

// DELETE GAME
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.game.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Game deleted" });
}
