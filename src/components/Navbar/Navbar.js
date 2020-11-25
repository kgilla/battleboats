import React, { useState } from "react";
import "./Navbar.css";

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (e) => {
    if (showMenu) setShowMenu(false);
    e.target.innerText === "New Game" ? props.newGame() : props.toggleRules();
  };

  const toggleMenu = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };

  return (
    <div className="nav-container">
      <nav className="main-nav">
        <h1 className="nav-title">BattleBoats!</h1>
        {props.windowWidth > 750 ? (
          <ul className="nav-links">
            {" "}
            <button className="nav-button" onClick={handleClick}>
              Rules
            </button>{" "}
            <button className="nav-button" onClick={handleClick}>
              New Game
            </button>
            <a
              href="https://github.com/kgilla/battleboats"
              target="_blank"
              rel="noreferrer"
              className="icon-link"
            >
              <props.icon className="icon" />
            </a>
          </ul>
        ) : (
          <button className="nav-button" onClick={toggleMenu}>
            Menu
          </button>
        )}
        {showMenu ? (
          <div className="overlay">
            <div className="nav-menu">
              <h2 className="nav-menu-heading">BattleBoats!</h2>{" "}
              <ul className="menu-links">
                {" "}
                <button className="setup-button" onClick={handleClick}>
                  New Game
                </button>
                <button className="setup-button" onClick={handleClick}>
                  Rules
                </button>{" "}
                <button
                  className="setup-button"
                  id="back-button"
                  onClick={toggleMenu}
                >
                  Back To Game
                </button>{" "}
                <a
                  href="https://github.com/kgilla/battleboats"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-link"
                >
                  <props.icon className="icon" />
                </a>
              </ul>
            </div>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
