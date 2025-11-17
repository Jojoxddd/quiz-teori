import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL GAMES
export async function GET() {
  const games = await prisma.game.findMany();
  return NextResponse.json(games);
}

// CREATE GAME
export async function POST(req: Request) {
  const body = await req.json();

  const newGame = await prisma.game.create({
    data: {
      name: body.name,
      genre: body.genre,
      rating: Number(body.rating),
      image: body.image || null,
      description: body.description || null,
    },
  });

  return NextResponse.json(newGame);
}
