import CardsTable from "./_components/cards-table";
import { Card } from "@prisma/client";

async function fetchFlashcards() {
  try {
    const res = await fetch("https://tuf-flashcards.vercel.app/api/cards", {
      next: { revalidate: 10 },
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

export default async function AdminPage() {
  const cards = await fetchFlashcards();

  return (
    <main className="p-6">
      <nav className="mb-4 flex items-end gap-12">
        <h1 className="text-2xl font-bold">Cards List</h1>
      </nav>
      <CardsTable cards={cards} />
    </main>
  );
}
