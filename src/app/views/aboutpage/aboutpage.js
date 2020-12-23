import React from "react";
import "./aboutpage.scss";
import { NavLink } from "react-router-dom";

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

function AboutInfo() {
  return (
    <div className="textbox">
      <h1>
        Tune-Do was made for Zothacks 2020 and won 3rd place!
      </h1>
      <h1>
        Contributors: William Hou, Donghyun Daniel Koo, Brett Kaplan, Ivan Chow
      </h1>
    </div>
  )
}

function Aboutpage(props) {
  return (
    <>
      <NameCard></NameCard>
      <AboutInfo></AboutInfo>
    </>
  );
}

export default Aboutpage;