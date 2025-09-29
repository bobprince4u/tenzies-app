import React from "react";

const Die = ({ value, isHeld, holdDice }) => {
  return (
    <button
      onClick={holdDice}
      aria-pressed={isHeld}
      aria-label={`Die showing ${value} ${isHeld ? "held" : "not held"}`}
      className={`w-14
      h-14
      flex
      justify-center
      items-center
      rounded-2xl
      mb-2
      text-2xl
      font-bold
      shadow-xl
      cursor-pointer
      focus:outline-none
      hover:bg-gray-200
      ${isHeld ? "bg-[#59E391]" : "bg-white"}
      transition-colors duration-200`}
    >
      {value}
    </button>
  );
};

export default Die;
