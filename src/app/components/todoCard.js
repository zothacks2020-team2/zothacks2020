//import React, {useState, useEffect} from "react";
import "./todoCard.scss";
import React from "react";
import {NavLink} from "react-router-dom";

//import { Link } from "react-router-dom";

function TodoCard({ data, toggleData }) {
    // const [completed, setCompleted] = useState(false);
    //  // let completed = true;
    // useEffect(function(){
    //     console.log(todoStr);
    //     //make a call to database and get the cloud data
    //     // imagine this is an api call
    //     // let serverResponse = ['walk dog', 'drink car', 'code code'];
    //     // setCompleted(serverResponse);
    // }, []);

    // useEffect(function(){
    //     if(completed) console.log('good job');
    // }, [completed]);


    return ( 
        <div className="todo-card flex-col" onClick={toggleData}>
            <h1 className= {data.completed ? "todo-completed" : ""}>{data.task}</h1>
            <div>
                <NavLink to={ {pathname:"/recommend", state:{task: data.task} } } className="suggested">
                    Get Suggestions
                </NavLink>
            </div>
            {/* {{data.completed ? "yes" : "no"}} */}
        <div className="todo-card" onClick={toggleData}>
            <h1>{data.task}</h1>
            {data.completed ? "yes" : "no"}
        </div>
    );
}

export default TodoCard;