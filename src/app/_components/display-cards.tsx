"use client";

import { Card } from "@prisma/client";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

type CardDivProps = {
  card: Card;
  isFlipped: boolean;
  onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

function CardDiv({ card, isFlipped, className, onClick }: CardDivProps) {
  return (
    <div
      className={twMerge(
        "relative h-[60vh] w-[60vw] max-w-sm cursor-pointer perspective-1000 md:h-[80vh] md:w-[90vw] md:max-w-md",
        className,
      )}
      onClick={onClick}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute flex h-full w-full items-center justify-center rounded-xl bg-white shadow-xl backface-hidden">
          <h2 className="text-2xl">{card.frontContent}</h2>
        </div>
        <div className="absolute flex h-full w-full rotate-y-180 items-center justify-center rounded-xl bg-gray-800 text-white shadow-xl backface-hidden">
          <h2 className="text-2xl">{card.backContent}</h2>
        </div>
      </div>
    </div>
  );
}

type DisplayCardsProps = {
  cards: Card[];
};

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (index < cards.length - 1) {
      setIsFlipped(false);
      setIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIsFlipped(false);
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative flex h-full items-center justify-center bg-[#d5fcd5]">
      {index > 0 && (
        <CardDiv
          card={cards[index - 1]}
          isFlipped={false}
          onClick={handlePrev}
          className="absolute -translate-x-1/4 scale-90 opacity-60 transition-transform duration-500"
        />
      )}
      <CardDiv
        card={cards[index]}
        isFlipped={isFlipped}
        onClick={() => setIsFlipped((prev) => !prev)}
        className="z-10 transition-transform duration-500"
      />
      {index < cards.length - 1 && (
        <CardDiv
          card={cards[index + 1]}
          isFlipped={false}
          onClick={handleNext}
          className="absolute translate-x-1/4 scale-90 opacity-60 transition-transform duration-500"
        />
      )}
    </div>
  );
}
