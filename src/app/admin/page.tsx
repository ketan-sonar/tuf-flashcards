"use client";

import { useState, useEffect } from "react";
import CardsTable from "./_components/cards-table";
import { Card } from "@prisma/client";

async function fetchFlashcards() {
  try {
    const res = await fetch("/api/cards");
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

export default function AdminPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCards = await fetchFlashcards();
      setCards(fetchedCards);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="p-6">
      <nav className="mb-4 flex items-end gap-12">
        <h1 className="text-2xl font-bold">Cards List</h1>
      </nav>
      <CardsTable cards={cards} />
    </main>
  );
}
