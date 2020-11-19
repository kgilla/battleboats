import React, { useState, useEffect } from "react";
import Boat from "../../game_classes/boat/boat_class";

const Boatyard = (props) => {
  const [boats, setBoats] = useState("");
  const handleClick = (e) => {};

  useEffect(() => {
    let newBoats = [];
    props.gameboard.boats.forEach((boat) => {
      for (let i = 0; i < boat.quantity; i++) {
        newBoats.push(new Boat(boat.name, boat.size));
      }
    });
    console.log(newBoats);
    setBoats(newBoats);
  }, []);

  return (
    <div className="shipyard">
      <h1 className="shipyard-title">Shipyard</h1>
      <div className="dock">
        <div>{boats ? boats[0].name : null}</div>
      </div>
      <button onClick={handleClick}>Rotate</button>
    </div>
  );
};

export default Boatyard;
