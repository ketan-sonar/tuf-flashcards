import { Card } from "@prisma/client";
import DisplayCards from "./_components/display-cards";

async function fetchFlashcards() {
  try {
    const res = await fetch("http://localhost:3000/api/cards", {
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      return [];
    } else {
      return (await res.json()) as Card[];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const cards = await fetchFlashcards();

  return (
    <main className="flex-1">
      <DisplayCards cards={cards} />
    </main>
  );
}
