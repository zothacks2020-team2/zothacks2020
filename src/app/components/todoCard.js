//import React, {useState, useEffect} from "react";
import "./todoCard.scss";
import React from "react";
import { NavLink } from "react-router-dom";

//import { Link } from "react-router-dom";

function TodoCard({ data, toggleData }) {
    return (
        <div className="todo-card flex-col" onClick={toggleData}>
            <h1 className={data.completed ? "todo-completed" : ""}>{data.task}</h1>
            <div>
                <NavLink to={{ pathname: "/recommend", state: { task: data.task } }} className="suggested">
                    Get Suggestions
                </NavLink>
            </div>
        </div>
    );
}

export default TodoCard;