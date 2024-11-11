import React, { useState } from "react";

export const Input = ({ todos, setTodos }) => {

    const [inputText, setInputText] = useState("")

    const addTodo = async (todoObject) => {
        const options = {
            method: "POST",
            body: JSON.stringify(todoObject),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch('https://playground.4geeks.com/todo/todos/alessf', options)
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('Error: ', response.status, response.statusText);
            return {
                error: {
                    status: response.status,
                    statusText: response.statusText
                }
            }
        }
    }

    const addTask = (e) => {
        if (e.key === "Enter" && inputText.trim() !== "") {
            const newTodoObject = { label: inputText, is_done: false };
            const newTodos = [...todos, newTodoObject];
            setTodos(newTodos);
            addTodo(newTodoObject);
            setInputText("");
        }
    }

    return (

        <input value={inputText} placeholder="Add a task..." onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => addTask(e)} />
    )
}
