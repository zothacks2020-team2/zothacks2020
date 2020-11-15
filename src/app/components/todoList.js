import React, { useState } from "react";
import "./todoList.scss";

// import axios from "axios"

// import { todoCard } from "app/components";
import TodoCard from "./todoCard";


function TodoList() {

    const [listOfTodos, setListOfTodos] = useState([
        {
            task: 'Walk the dog',
            new: false,
            completed: false,
        },
        {
            task: 'Prepare dinner',
            new: false,
            completed: false,
        },
        {
            task: 'Date night',
            new: false,
            completed: false,
        },
        {
            task: 'Buy K-pop concert tickets',
            new: false,
            complete: false,
        },
        {
            task: 'Fake wires in electrical',
            new: false,
            complete: false,
        }
    ]);
    // user package is called sweetalert2
    // add function to read input str
    function addTodo(){
        setListOfTodos([...listOfTodos, {task: 'Go play tennis', new: true, completed: false}]);
    }
  
    function toggleTodo(index) {
        let newListOfTodos = listOfTodos;
        newListOfTodos[index].completed = !newListOfTodos[index].completed;
        setListOfTodos([...newListOfTodos]);
    }

    return (
        <div className="todo-list">
            {listOfTodos.map((singularTodo, index) => {
                return (<TodoCard data={singularTodo} number={index} toggleData={() => { toggleTodo(index) }} />);
            })}
            <button onClick={addTodo} style={{ height: '100px', width: '100px', borderRadius: '50%', backgroundImage: "url('https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')", backgroundSize: 'cover', transitionDelay: "400ms"}}>
            </button>
        </div>
    );
}

export default TodoList;