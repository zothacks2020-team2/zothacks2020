import React from "react";
import "./todoList.scss";

// import axios from "axios"

// import { todoCard } from "app/components";
import TodoCard from "./todoCard";

var todoItems = ["walk dog", "do dishes", "study", "go to school"];

function TodoList() {
    // needs to get the list of todo's

    // get the list of todo's from database upon page load

    // checking the response status

    return (
        <div className="todo-list">
            {(todoItems || []).map(function (todoStr){
                console.log(todoStr);
                return (<TodoCard todoStr={todoStr}/>);
            })}
        </div>
    );
}

export default TodoList;