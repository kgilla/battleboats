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
          <h2 className="rules-heading">The Rules.</h2>
          <ul>
            {" "}
            <li className="rule">
              Place your ships manually by dragging and dropping them onto your
              board or by randomly placing them.
            </li>
            <li className="rule">
              Each turn you must guess a square on your enemy's board you think
              might have a ship.
            </li>
            <li className="rule">
              If you guess correctly, you are able to continue your attack until
              you miss.
            </li>
            <li className="rule">
              The game is over once a player successfully sinks all of their
              opponent's boats
            </li>
          </ul>
        </div>
        <div className="rules-legend-container">
          <h2 className="rules-heading">Board Legend</h2>
          <ul className="rules-legend">
            {" "}
            <div className="legend-item">
              {" "}
              <p>Your Ships</p>
              <div className="your-ship"></div>
            </div>
            <div className="legend-item">
              {" "}
              <p>A Hit</p>
              <div className="board-hit">X</div>
            </div>
            <div className="legend-item">
              {" "}
              <p>A Miss</p>
              <div className="board-miss">~</div>
            </div>
            <div className="legend-item">
              {" "}
              <p>A Sunken Boat</p>
              <div className="is-sunk">X</div>
            </div>
          </ul>
        </div>

        <button className="setup-button" onClick={handleClick}>
          Got It!
        </button>
      </div>
    </div>
  );
};

export default Rules;
