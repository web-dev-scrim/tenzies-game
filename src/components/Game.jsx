import Dice from "./Dice";
import React from "react";

export default function Game() {
  const [dice, setDice] = React.useState([
    { id: 1, value: 1, isHeld: false },
    { id: 2, value: 2, isHeld: false },
    { id: 3, value: 1, isHeld: false },
    { id: 4, value: 4, isHeld: false },
    { id: 5, value: 5, isHeld: false },
    { id: 6, value: 3, isHeld: false },
    { id: 7, value: 3, isHeld: false },
    { id: 8, value: 5, isHeld: false },
    { id: 9, value: 6, isHeld: false },
    { id: 10, value: 1, isHeld: false }
  ]);

  function setDieHeld(id) {
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    })
  }

  function shuffleDice() { 
    setDice(oldDice => { 
      return oldDice.map(die => {
        return die.isHeld ? die : {...die, value: Math.floor(Math.random() * 6) + 1};
      })
    })
  }

  return (
    <section className="game">
      <h3 className="game-title">Tenzies</h3>
      <p className="game-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <Dice
        dice={dice}
        setDieHeld={setDieHeld}
      ></Dice>
      <button className="roll-btn" onClick={shuffleDice}>Roll</button>
    </section>
  );
}