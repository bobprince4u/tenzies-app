import React from "react";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import party from "party-js";
import { Timer, Dice6 } from "lucide-react";
import Die from "./components/Die";
import RollDice from "./components/RollDice";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [rolls, setRolls] = useState(0);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState("idle");

  const buttonRef = useRef(null);
  const timerRef = useRef(null);

  const allHeld = dice.every((die) => die.isHeld);
  const allSameValue = dice.every((die) => die.value === dice[0].value);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  //Start timer when game starts
  useEffect(() => {
    if (status === "playing") {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [status]);

  // Track game result
  useEffect(() => {
    if (allHeld && allSameValue) {
      setStatus("won");
      party.confetti(document.body, { count: party.variation.range(80, 150) });
    } else if (allHeld && !allSameValue) {
      setStatus("lost");
    }
  }, [dice]);

  //Auto-focus New Game button
  useEffect(() => {
    if ((status === "won" || status === "lost") && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [status]);

  function allNewDice() {
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  function rollDice() {
    if (status === "won" || status === "lost") {
      setDice(allNewDice());
      setStatus("idle");
      setRolls(0);
      setTime(0);
    } else {
      if (status === "idle") {
        setStatus("playing");
      }
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
      setRolls((prev) => prev + 1);
    }
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('./src/assets/dice1.jpeg')] bg-cover bg-contain bg-no-repeat">
      <div className="bg-[#0B2434] w-full max-w-[600px] p-6 rounded flex flex-col justify-center items-center shadow-xl">
        <main className="flex flex-col justify-evenly items-center bg-[#f5f5f5] h-96 w-full p-3 rounded shadow-xl">
          <h1 className="font-[500] text-3xl text-gray-500">
            A Mini Tenzies Game
          </h1>
          <p className="text-center text-blue-800 mb-4">
            Match all dice as fast as you can! Click a die to lock its value and
            strategize your way to victory
          </p>

          {status === "won" && (
            <p className="text-bold text-blue-900">
              Congratulations! You won i {rolls} rolls and {time}s!
            </p>
          )}
          {status === "lost" && (
            <p className="font-bold text-red-700"> You lost! Try again.</p>
          )}

          <div className="flex gap-6 my-2">
            <p className="text-blue-800 font-semibold">
              <Timer className="w-5 h-5" /> {time}s
            </p>
            <p className="text-blue-800 font-semibold">
              <Dice6 className="w-5 h-5" /> {rolls}
            </p>
          </div>

          <div className="grid grid-cols-5 w-fit gap-3 justify-center place-content-center items-center">
            {diceElements}
          </div>
          <div className="">
            <RollDice
              ref={buttonRef}
              onClick={rollDice}
              text={gameWon ? "New Game" : "Roll Dice"}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
