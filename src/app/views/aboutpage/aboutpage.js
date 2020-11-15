import React from "react";
import "./aboutpage.scss";
import {NavLink} from "react-router-dom";

function NameCard(props) {
    return (
      <div className="nameCard" style={props.style}>
          <div className="navigation flex-row">
                  <NavLink to="/" className="navItem">
                      back
                  </NavLink>
          </div>
          <h1 className="title">
              About Us
          </h1>
      </div>
    );
}

function Aboutpage(props) {
  return (
    <>
        <NameCard></NameCard>
    </>
  );
}

export default Aboutpage;