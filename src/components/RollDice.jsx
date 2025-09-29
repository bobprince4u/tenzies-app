import React, { forwardRef } from "react";

const RollDice = forwardRef((props, ref) => {
  const { onClick, text } = props;
  return (
    <div>
      <button
        ref={ref}
        onClick={onClick}
        aria-label={`Roll Dice ${text}`}
        className="bg-blue-500 h-10 w-25 rounded-lg cursor-pointer border-none hover:bg-[#1c3a52] text-white transition"
      >
        {text}
      </button>
    </div>
  );
});

export default RollDice;
