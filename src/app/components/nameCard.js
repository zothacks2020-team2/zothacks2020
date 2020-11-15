import React from "react";
import { NavLink } from "react-router-dom";
import './nameCard.scss';


function NameCard(props) {
  return (
    <div className="nameCard" style={props.style}>
      <div className="navigation flex-row">
        <NavLink to="/about" className="navItem">
          about
                </NavLink>
      </div>
      <h1 className="projectName">
        Team Two
      </h1>
    </div>
  );
}

export default NameCard;