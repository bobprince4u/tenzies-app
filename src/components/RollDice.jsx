import React from "react";

const RollDice = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-blue-500 h-10 w-25 rounded-lg cursor-pointer border-none hover:bg-[#1c3a52] text-white transition"
      >
        Roll Dice
      </button>
    </div>
  );
};

export default RollDice;
