import React, { useState } from "react";
import "./todoList.scss";

// import axios from "axios"

// import { todoCard } from "app/components";
import TodoCard from "./todoCard";


function TodoList() {

    const [listOfTodos, setListOfTodos] = useState([
        {
            task: 'Walk the dog',
            completed: false,
        },
        {
            task: 'Prepare Dinner',
            completed: false,
        },
        {
            task: 'Date Night',
            completed: false,
        }
    ]);
    // user package is called sweetalert2
    // add function to read input str
    function addTodo(){
        setListOfTodos([...listOfTodos, {task: 'Go play tennis', completed: false}]);
    }
  
    function toggleTodo(index) {
        let newListOfTodos = listOfTodos;
        newListOfTodos[index].completed = !newListOfTodos[index].completed;
        setListOfTodos([...newListOfTodos]);
    }

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