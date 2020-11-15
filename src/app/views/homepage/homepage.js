import React from "react";
import TodoList from "../../components/todoList"
//import './.scss';

function Homepage(props) {
  return (
    <div className="todoList" style={props.style}>
        <TodoList></TodoList>
    </div>
  );
}

export default Homepage;