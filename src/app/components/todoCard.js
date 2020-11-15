//import React, {useState, useEffect} from "react";
import "./todoCard.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

//import { Link } from "react-router-dom";

function TodoCard({ data, number, toggleData }) {
    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 1],
            }}
            transition={{
                duration: 1.0,
                delay: data.new ? 0.4 : number * 0.4
            }}
            className="todo-card flex-col" onClick={toggleData}>
            <h1 className={data.completed ? "todo-completed" : ""}>{data.task}</h1>
            <div>
                <NavLink to={{ pathname: "/recommend", state: { task: data.task } }} className="suggested">
                    Get Suggestions
                </NavLink>
            </div>
        </motion.div>
    );
}

export default TodoCard;