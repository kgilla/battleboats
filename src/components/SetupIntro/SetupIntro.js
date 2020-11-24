import React from "react";
import "./SetupIntro.css";

const SetupIntro = (props) => {
  const handleClick = () => {
    props.introChange();
  };

  return (
    <div className="overlay">
      {" "}
      <div className="setup-intro-container">
        <h2 className="setup-intro-heading">The Setup.</h2>
        <ul className="setup-intro-list">
          <li className="setup-intro-tip">
            Drag and drop your boats onto your board.
          </li>
          <li className="setup-intro-tip">
            You can rotate ships before you grab them by clicking on them.
          </li>
          <li className="setup-intro-tip">
            You can remove a placed ship simply by clicking on it.
          </li>
        </ul>
        <button className="setup-button" onClick={handleClick}>
          Thanks Tips!
        </button>
      </div>
    </div>
  );
};

export default SetupIntro;
