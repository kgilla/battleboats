import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
  const handleClick = (e) => {
    e.target.innerText === "New Game" ? props.newGame() : props.toggleRules();
  };

  return (
    <div className="nav-container">
      <nav className="main-nav">
        <h1 className="nav-title">BattleBoats!</h1>
        <ul className="nav-links">
          {" "}
          <button className="nav-button" onClick={handleClick}>
            Rules
          </button>{" "}
          <button className="nav-button" onClick={handleClick}>
            New Game
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
