import React, { useState } from "react";
import "./todoList.scss";

// import axios from "axios"

// import { todoCard } from "app/components";
import TodoCard from "./todoCard";
import { CreateUserModal } from "app/components";


function TodoList() {
    const [showModal, setShowModal] = useState(false);
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

    function addTodo(newItem) {
        setListOfTodos([...listOfTodos, newItem]);
    }

    function toggleTodo(index) {
        let newListOfTodos = listOfTodos;
        newListOfTodos[index].completed = !newListOfTodos[index].completed;
        setListOfTodos([...newListOfTodos]);
    }

    function refreshPage() {
        setShowModal(false);
        TodoList();
    }

    // creating a div with a terniary operator. If showmodal, then classname == todolist + blur
    return (
        <div>
            <div className={showModal ? "blur" : ""}>
                <div className="todo-list">
                    {listOfTodos.map((singularTodo, index) => {
                        return (<TodoCard data={singularTodo} number={index} toggleData={() => { toggleTodo(index) }} />);
                    })}
                </div>

                <button onClick={() => setShowModal(true)} style={{ height: '100px', width: '100px', borderRadius: '50%', backgroundImage: "url('https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')", backgroundSize: 'cover', transitionDelay: "400ms" }}></button>
            </div>


            {showModal ?
                <CreateUserModal
                    addItem={addTodo}
                    onCancel={() => setShowModal(false)}
                    onCreate={refreshPage}
                />
                : null
            }
        </div>
    );
}

export default TodoList;