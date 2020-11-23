import React from "react";
import "./Rules.css";

const Rules = (props) => {
  const handleClick = () => {
    props.toggleRules();
  };
  return (
    <div className="overlay">
      <div className="rules-container">
        <h2>BattleBoats Rules!</h2>
        <ul>
          <li>
            Place your ships manually by dragging and dropping them onto your
            board or by randomly placing them.
          </li>
          <li>
            Each turn you must guess a square on your enemy's board you think
            might have a ship.
          </li>
          <li>
            If you guess correctly, you are able to continue your attack until
            you miss.
          </li>
          <li>
            The game is over once a player successfully sinks all of their
            opponent's boats
          </li>
        </ul>
        <h2>Legend</h2>
        <ul>
          <li>This is your ship :</li>
          <div className="your-ship"></div>
          <li> A hit looks like:</li>
          <div className="board-hit">X</div>
          <li>A miss looks like :</li>
          <div className="board-miss">~</div>
          <li>This is a sunk ship:</li>
          <div className="is-sunk">X</div>
        </ul>
        <button onClick={handleClick}>Got It!</button>
      </div>
    </div>
  );
};

export default Rules;
