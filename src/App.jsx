import React from "react";
import { useState } from "react";

import Die from "./components/Die";
import RollDice from "./components/RollDice";

function App() {
  const [dice, setDice] = useState(allNewDice());

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function allNewDice() {
    return new Array(10).fill(0).map(() => ({
      id: generateId(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  function rollDice() {
    setDice(allNewDice());

    console.log(dice);
  }
  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} />
  ));

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#0B2434] w-full max-w-[600px] p-6 rounded flex flex-col justify-center items-center">
        <main className="flex flex-col justify-evenly items-center bg-[#f5f5f5] h-96 w-full p-3 rounded">
          <div className="grid grid-cols-5 w-fit gap-3 justify-center place-content-center items-center">
            {diceElements}
          </div>
          <div className="">
            <RollDice onClick={rollDice} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
