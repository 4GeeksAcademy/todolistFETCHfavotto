import React, { useState, useEffect } from "react";
import { List } from "./List";
import { Input } from "./input";

const Home = () => {
	const [todos, setTodos] = useState([])
	const deleteTodo = (index) => {
		const newTodos = todos.filter((_, i) => i !== index);
		setTodos(newTodos)
	}
	useEffect(() => {
		async function createUser() {
			let response = await fetch("https://playground.4geeks.com/todo/users/alessf")
			let data = await response.json()
			if (data.detail == "Agenda \"alessf\" doesn't exist.") {
				let response = await fetch("https://playground.4geeks.com/todo/users/alessf", {
					method: "POST"
				})
				let data = response.json()
			}
			else {
				setTodos(data.todos)
			}

		}
	}, [])
	return (
		<div className="Page text-center">
			<h1 className="title">To do List :</h1>
			<Input todos={todos} setTodos={setTodos} />
			<List todos={todos} setTodos={setTodos} deleteTodo={deleteTodo} />
		</div>
	);
};

export default Home;