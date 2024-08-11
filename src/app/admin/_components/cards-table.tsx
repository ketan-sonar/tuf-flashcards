"use client";

import { Card } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

type CardsTableProps = {
  cards: Card[];
};

export default function CardsTable({ cards }: CardsTableProps) {
  const [editableCards, setEditableCards] = useState(cards);
  const [newCard, setNewCard] = useState<Card>({
    id: "",
    title: "",
    frontContent: "",
    backContent: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    field: keyof Card,
  ) => {
    const { value } = e.target;
    setEditableCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card,
      ),
    );
  };

  const handleNewCardChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Card,
  ) => {
    const { value } = e.target;
    setNewCard((prevCard) => ({
      ...prevCard,
      [field]: value,
    }));
  };

  const handleSave = async (id: string) => {
    const card = editableCards.find((card) => card.id === id);

    if (!card) return;

    if (!card.title || !card.frontContent || !card.backContent) {
      toast.error("All fields must be filled out");
      return;
    }

    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      });

      if (!response.ok) {
        throw new Error("Failed to update card");
      }

      toast.success("Card updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleAddCard = async () => {
    if (!newCard.title || !newCard.frontContent || !newCard.backContent) {
      toast.error("All fields must be filled out");
      return;
    }

    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });

      if (!response.ok) {
        throw new Error("Failed to add new card");
      }

      const addedCard: Card = await response.json();
      setEditableCards((prevCards) => [...prevCards, addedCard]);
      setNewCard({ id: "", title: "", frontContent: "", backContent: "" });
      toast.success("New card added successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this card?")) return;

    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete card");
      }

      setEditableCards((prevCards) =>
        prevCards.filter((card) => card.id !== id),
      );
      toast.success("Card deleted successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-6 rounded-lg border bg-gray-50 p-4">
        <h2 className="mb-4 text-xl font-semibold">Add New Card</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Title"
            value={newCard.title}
            onChange={(e) => handleNewCardChange(e, "title")}
            className="w-full rounded border border-gray-300 px-2 py-1"
          />
          <input
            type="text"
            placeholder="Front Content"
            value={newCard.frontContent}
            onChange={(e) => handleNewCardChange(e, "frontContent")}
            className="w-full rounded border border-gray-300 px-2 py-1"
          />
          <input
            type="text"
            placeholder="Back Content"
            value={newCard.backContent}
            onChange={(e) => handleNewCardChange(e, "backContent")}
            className="w-full rounded border border-gray-300 px-2 py-1"
          />
        </div>
        <button
          onClick={handleAddCard}
          className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Add Card
        </button>
      </div>

      <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border-b px-4 py-3 font-semibold text-gray-600">
              ID
            </th>
            <th className="border-b px-4 py-3 font-semibold text-gray-600">
              Title
            </th>
            <th className="border-b px-4 py-3 font-semibold text-gray-600">
              Front Content
            </th>
            <th className="border-b px-4 py-3 font-semibold text-gray-600">
              Back Content
            </th>
            <th className="border-b px-4 py-3 font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {editableCards.map((card) => (
            <tr key={card.id} className="transition-colors hover:bg-gray-50">
              <td className="border-b px-4 py-3">{card.id}</td>
              <td className="border-b px-4 py-3">
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleInputChange(e, card.id, "title")}
                  className="w-full rounded border border-gray-300 px-2 py-1"
                />
              </td>
              <td className="border-b px-4 py-3">
                <input
                  type="text"
                  value={card.frontContent}
                  onChange={(e) =>
                    handleInputChange(e, card.id, "frontContent")
                  }
                  className="w-full rounded border border-gray-300 px-2 py-1"
                />
              </td>
              <td className="border-b px-4 py-3">
                <input
                  type="text"
                  value={card.backContent}
                  onChange={(e) => handleInputChange(e, card.id, "backContent")}
                  className="w-full rounded border border-gray-300 px-2 py-1"
                />
              </td>
              <td className="flex gap-2 border-b px-4 py-3">
                <button
                  onClick={() => handleSave(card.id)}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
