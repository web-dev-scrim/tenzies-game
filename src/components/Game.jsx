import Dice from "./Dice";
import { useState, useRef, useEffect } from "react";
import { nanoid } from 'nanoid'
import ReactConfetti from "react-confetti";

export default function Game() {
  
  
  function generateAllNewDice() {

   return Array(10).fill().map(() => {
      return {
        id: nanoid(),
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      }
   }
   )
  }

  const [dice, setDice] = useState(() => generateAllNewDice());//How lazy-initialization is used here to generate the initial state of the dice only once when the component mounts, rather than on every render. This can improve performance by avoiding unnecessary calculations on subsequent renders.

  const isGameWon = dice.every(die => die.isHeld && die.value === dice[0].value);

  const buttonRef = useRef(null);

  useEffect(() => {

    if (isGameWon && buttonRef.current) { 
      buttonRef.current.focus();
    }
   }, [isGameWon]);


  function setDieHeld(id) {
    setDice(oldDice => {
      return oldDice.map(die => {
        return (die.id === id && !die.isHeld) ? { ...die, isHeld: true } : die;
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

  function restartGame() {
    setDice(generateAllNewDice());
  }

  return (
    <section className="game">
      {isGameWon && <ReactConfetti />}
      <h3 className="game-title">Tenzies</h3>
      <p className="game-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <Dice
        dice={dice}
        setDieHeld={setDieHeld}
      ></Dice>
      <button ref={buttonRef} className="roll-btn" onClick={isGameWon ? restartGame : shuffleDice}>{isGameWon ? "New Game" : "Roll"}</button>
    </section>
  );
}