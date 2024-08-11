import prisma from "./db";

export async function getAllFlashcards() {
  return await prisma.card.findMany();
}
