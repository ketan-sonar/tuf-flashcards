import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const { title, frontContent, backContent } = await request.json();

  if (!title || !frontContent || !backContent) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  try {
    const existingCard = await prisma.card.findUnique({
      where: { id: String(id) },
    });

    if (!existingCard) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    const updatedCard = await prisma.card.update({
      where: { id: String(id) },
      data: {
        title,
        frontContent,
        backContent,
      },
    });

    return NextResponse.json(updatedCard);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update card" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const existingCard = await prisma.card.findUnique({
      where: { id },
    });

    if (!existingCard) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    await prisma.card.delete({
      where: { id },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error("Error deleting card:", error);
    return NextResponse.json(
      { message: "Failed to delete card" },
      { status: 500 },
    );
  }
}
