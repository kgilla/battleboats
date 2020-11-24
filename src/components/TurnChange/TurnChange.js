import React from "react";
import "./TurnChange.css";

const TurnChange = (props) => {
  return (
    <div className={props.userTurn ? "your-turn" : "cpu-turn"}>
      {props.userTurn ? "Your Turn!" : "Computer's Turn"}
    </div>
  );
};

export default TurnChange;
