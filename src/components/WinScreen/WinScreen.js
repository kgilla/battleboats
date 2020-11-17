import React from "react";
import "./WinScreen.css";

const WinScreen = (props) => {
  return (
    <div className="overlay">
      <div className="win-box">
        <h1>Winner!</h1>
        {props.message}
      </div>
    </div>
  );
};

export default WinScreen;
