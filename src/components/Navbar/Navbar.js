import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
  const handleClick = () => {
    props.newGame();
  };

  return (
    <nav className="main-nav">
      <h1 className="nav-title">BattleBoats!</h1>
      <button className="nav-button" onClick={handleClick}>
        New Game
      </button>
    </nav>
  );
};

export default Navbar;
