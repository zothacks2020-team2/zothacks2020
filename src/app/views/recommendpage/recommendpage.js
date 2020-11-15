import React from "react";
import "./recommendpage.scss";
import { NavLink } from "react-router-dom";
import SongList from "../../components/songList";

function NameCard(props) {
  return (
    <div className="nameCard" style={props.style}>
      <div className="navigation flex-row">
        <NavLink to="/" className="navItem">
          back
                  </NavLink>
      </div>
      <h1 className="title">
        Team Two
          </h1>
    </div>
  );
}

function RecommendPage(props) {
  const task = props.location.state.task

  return (
    <>
      <NameCard />
      <h1 className="subTitle">
        {task}
      </h1>
      <SongList task={task} />
    </>
  );
}

export default RecommendPage;