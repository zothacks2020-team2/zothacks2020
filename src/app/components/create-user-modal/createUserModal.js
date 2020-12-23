import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import './createUserModal.scss';

function CreateUserModal({addItem, onCreate, onCancel}) {
    const [itemDescription, setItemDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const newTask = {
            task: itemDescription,
            new: true,
            completed: false
        }
        addItem(newTask);
        //onCancel();
    }

    return (
        <form className = "myForm" onSubmit={handleSubmit}>
            <label>Item Description</label>
            <input type = "text" onChange={(event) => setItemDescription(event.target.value)} required></input>

            <input type = "button" type="submit" value="Add Item"></input>

            <button className="button" type="button" onClick={onCancel}>Cancel</button>
            <p id="error-message"></p>
        </form>
    )
}


export default CreateUserModal;
