import React, { useState } from "react";
import "./Ship.css";

const Square = (props) => {
  let [state, setState] = useState("");
  const handleClick = (e) => {
    if (props.data === null) {
      setState("hit");
    }
    props.passData(props.data);
  };
  return <div className={state ? state : "square"} onClick={handleClick}></div>;
};

export default Square;
