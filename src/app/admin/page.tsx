import { getAllFlashcards } from "@/utils/actions";
import CardsTable from "./_components/cards-table";

export default async function AdminPage() {
  const cards = await getAllFlashcards();

  return (
    <main className="p-6">
      <nav className="mb-4 flex items-end gap-12">
        <h1 className="text-2xl font-bold">Cards List</h1>
      </nav>
      <CardsTable cards={cards} />
    </main>
  );
}
