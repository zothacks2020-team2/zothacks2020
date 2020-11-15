import React, { useState } from "react";
import "./Task.scss";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";


function Task(props) {
    const [completed, setCompleted] = useState(false);

    const handleCompleted = () => {
        setCompleted(!completed);
    }

    const handleDelete = () => {
        alert("Deleted!")
    }

    return (
        <Link to={'/'}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0, 1],
                }}
                transition={{
                    duration: 0.2,
                    delay: 5 * 0.1
                }}
                className={completed ? "task-card-completed" : "task-card"}>
                {completed ?
                    <h1 className="taskname-completed">props.taskname</h1> : <h1 className="taskname-uncompleted">props.taskname</h1>
                }
                {completed ?
                    <a href="your link here" onClick={handleCompleted}><i class="fas fa-undo fa-4x undo"></i></a> :
                    <a href="your link here" onClick={handleCompleted}><i class="fas fa-check fa-4x checkmark"></i></a>
                }

                <a href="your link here">
                    <i class="far fa-times-circle fa-4x delete" onClick={handleDelete}></i>
                </a>
            </motion.div>
        </Link>

    );
}

export default Task;