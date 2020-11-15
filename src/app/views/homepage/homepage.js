import React from "react";
import TodoList from "../../components/todoList"
import NameCard from "../../components/nameCard"
//import './.scss';

function Homepage(props) {
  return (
    <>
        <NameCard></NameCard>
        <TodoList></TodoList>
    </>
  );
}

export default Homepage;