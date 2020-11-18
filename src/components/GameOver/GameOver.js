import React from "react";
import "./GameOver.css";

const GameOver = (props) => {
  const handleClick = () => {
    props.handleNewGame();
  };

  return (
    <div className="overlay">
      <div className={props.data.win ? "win-box" : "lose-box"}>
        <h1 className="gameover-heading">{props.data.title}</h1>
        <p className="gameover-message">{props.data.message}</p>
        <button className="gameover-button" onClick={handleClick}>
          Play Again?
        </button>
      </div>
    </div>
  );
};

export default GameOver;
