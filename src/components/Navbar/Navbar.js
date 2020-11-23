import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
  const handleClick = (e) => {
    e.target.innerText === "New Game" ? props.newGame() : props.toggleRules();
  };

  return (
    <nav className="main-nav">
      <h1 className="nav-title">BattleBoats!</h1>
      <ul className="nav-links">
        <li>
          {" "}
          <button className="nav-button" onClick={handleClick}>
            Game Rules
          </button>
        </li>
        <li>
          {" "}
          <button className="nav-button" onClick={handleClick}>
            New Game
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
