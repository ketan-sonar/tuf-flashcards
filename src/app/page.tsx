import { getAllFlashcards } from "@/utils/actions";
import DisplayCards from "./_components/display-cards";

export default async function Home() {
  const cards = await getAllFlashcards();
  return (
    <main className="flex-1">
      <DisplayCards cards={cards} />
    </main>
  );
}
