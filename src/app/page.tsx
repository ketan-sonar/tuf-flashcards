"use client";

import { useState, useEffect } from "react";
import { Card } from "@prisma/client";
import DisplayCards from "./_components/display-cards";

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

export default function Home() {
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
      <div className="flex h-full items-center justify-center bg-[#d5fcd5] text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex-1">
      <DisplayCards cards={cards} />
    </main>
  );
}
