import React, { useState } from "react";
import "./todoList.scss";

// import axios from "axios"

// import { todoCard } from "app/components";
import TodoCard from "./todoCard";


function TodoList() {
    // needs to get the list of todo's

    // get the list of todo's from database upon page load

    const [listOfTodos, setListOfTodos] = useState([
        {
            task: 'walk dog',
            completed: false,
        },
        {
            task: 'eat',
            completed: false,
        },
    ]);
    // user package is called sweetalert2
    // add function to read input str
    function addTodo() {
        setListOfTodos([...listOfTodos, { task: 'pick usp[', completed: false }]);
    }
    function toggleTodo(index) {
        let newListOfTodos = listOfTodos;
        newListOfTodos[index].completed = !newListOfTodos[index].completed;
        setListOfTodos([...newListOfTodos]);
    }
    // checking the response status

    return (
        <div className="todo-list">
            {/* {(todoItems || []).map(function (todoStr){
                console.log(todoStr);
                return (<TodoCard todoStr={todoStr}/>);
            })} */}
            {listOfTodos.map((singularTodo, index) => {
                return (<TodoCard data={singularTodo} toggleData={() => { toggleTodo(index) }} />);
            })}
            <button onClick={addTodo} style={{ height: '100px', width: '100px', borderRadius: '50%', backgroundImage: "url('https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')", backgroundSize: 'cover' }}>
            </button>
        </div>
    );
}

export default TodoList;