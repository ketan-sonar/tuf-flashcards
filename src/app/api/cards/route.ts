import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cards = await prisma.card.findMany();
    return NextResponse.json(cards);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch flash cards!" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const { title, frontContent, backContent } = await request.json();

  if (!title || !frontContent || !backContent) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  try {
    const newCard = await prisma.card.create({
      data: {
        title,
        frontContent,
        backContent,
      },
    });
    return NextResponse.json(newCard, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add new card" },
      { status: 500 },
    );
  }
}
