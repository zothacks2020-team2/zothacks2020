import React from "react";
import "./todoCard.scss";

//import { Link } from "react-router-dom";

function TodoCard({todoStr}){
    return (
        //<Link to={/}></Link>
        <div className="todo-card">
            <h1>{todoStr}</h1>
        </div>
    );
}

export default TodoCard