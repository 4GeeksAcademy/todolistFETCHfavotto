import React, { useState, useEffect } from "react";
import { List } from "./List";
import { Input } from "./input";


const Home = () => {
    const [todos, setTodos] = useState([]);

    const deleteTodo = async (index) => {
        const newTodos = todos.filter((_, i) => i !== index);

        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/0", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodos),
            });

            if (response.ok) {
                setTodos(newTodos); // Update local state only if the API call succeeds
            } else {
                console.error("Failed to delete todo:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const getTodos = () => {
        fetch('https://playground.4geeks.com/todo/users/alessf')
            .then(response => response.json())
            .then(data => {
                setTodos(data.todos)
            })
            .catch(error => console.log("Error: ", error))
    }

    useEffect(() => {
        async function createUser() {
            try {
                let response = await fetch("https://playground.4geeks.com/todo/users/alessf");
                let data = await response.json();

                if (data.detail === "Agenda \"alessf\" doesn't exist.") {
                    response = await fetch("https://playground.4geeks.com/todo/users/alessf", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ todos: [] }),
                    });

                    if (response.ok) {
                        console.log("User created successfully");
                        setTodos([]); // Set todos to an empty array
                    } else {
                        console.error("Failed to create user:", response.status, response.statusText);
                    }
                } else {
                    setTodos(Array.isArray(data.todos) ? data.todos : []);
                }
            } catch (error) {
                console.error("Error fetching or creating user:", error);
            }
        }

        createUser(); 
        getTodos();
    }, []);

    return (
        <div className="Page text-center">
            <h1 className="title">To-Do List:</h1>
            <Input todos={todos} setTodos={setTodos} getData = {getTodos} />
            <List todos={todos} setTodos={setTodos} deleteTodo={deleteTodo} />
        </div>
    );
};

export default Home;
