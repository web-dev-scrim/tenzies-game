export default function Dice(props) {

  const diceElements = props.dice.map(die => {
    return <div className="die" key={die.id}
    style = {die.isHeld ? { backgroundColor: "#59E391" } : { backgroundColor: "#FFFFFF" }}
    onClick={() => props.setDieHeld(die.id)}
    >{die.value}</div>;
  })

  return (
    <section className="dice">
      {diceElements}
    </section>
  );
}