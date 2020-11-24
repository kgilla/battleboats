import React from "react";
import "./Rules.css";

const Rules = (props) => {
  const handleClick = () => {
    props.toggleRules();
  };
  return (
    <div className="overlay">
      <div className="rules-container">
        <div className="main-rules">
          {" "}
          <h2 className="rules-heading">BattleBoats Rules!</h2>
          <ul>
            {" "}
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
          <h2 className="rules-heading">Board Legend</h2>
        </div>
        <div className="rules-legend">
          {" "}
          <div className="legend-item">
            {" "}
            <p>This is your ship :</p>
            <div className="your-ship"></div>
          </div>
          <div className="legend-item">
            {" "}
            <p> A hit looks pke:</p>
            <div className="board-hit">X</div>
          </div>
          <div className="legend-item">
            {" "}
            <p>A miss looks like :</p>
            <div className="board-miss">~</div>
          </div>
          <div className="legend-item">
            {" "}
            <p>This is a sunk ship:</p>
            <div className="is-sunk">X</div>
          </div>
          <div className="legend-item"></div>
        </div>

        <button className="setup-button" onClick={handleClick}>
          Got It!
        </button>
      </div>
    </div>
  );
};

export default Rules;
