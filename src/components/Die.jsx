import React from "react";

const Die = ({ value, isHeld }) => {
  return (
    <button
      aria-label={`Die showing ${value}`}
      className={`w-14
      h-14
      flex
      justify-center
      items-center
      rounded-2xl
      mb-2
      text-2xl
      font-bold
      cursor-pointer
      focus:outline-none
      hover:bg-gray-200
      ${isHeld ? "bg-green-200" : "bg-white"}`}
    >
      {value}
    </button>
  );
};

export default Die;
