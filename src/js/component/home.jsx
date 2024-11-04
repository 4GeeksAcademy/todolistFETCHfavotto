import React, { useState, useEffect } from "react";

const Home = () => {
	const [task, setTask] = useState({ label: "", done: false });
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		console.log("Fetching tasks...");
		try {
			const response = await fetch("https://playground.4geeks.com/todo/user/alesanchezr");
			if (!response.ok) throw new Error("Failed to fetch tasks");
			const data = await response.json();
			const formattedTasks = data.map((item, index) => ({
				id: index, 
				label: item.label, 
				done: item.done,
			}));
			setTasks(formattedTasks);
			console.log("Fetched tasks:", formattedTasks);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	const syncTasks = async (todos) => {
		console.log("Synchronizing tasks to server...");
		try {
			const response = await fetch("https://playground.4geeks.com/todo/user/alesanchezr", {
				method: "PUT",
				body: JSON.stringify(todos),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) throw new Error("Failed to sync tasks");
			console.log("Tasks synchronized successfully:", await response.json());
		} catch (error) {
			console.error("Error syncing tasks:", error);
		}
	};

	const addTask = async (e) => {
		if (e.key === "Enter" && task.label !== "") {
			const newTask = { id: tasks.length, ...task };
			const updatedTasks = [...tasks, newTask];
			setTasks(updatedTasks);
			setTask({ label: "", done: false });
			await syncTasks(updatedTasks); 
		}
	};

	const removeTask = async (id) => {
		const updatedTasks = tasks.filter((item) => item.id !== id);
		setTasks(updatedTasks);
		await syncTasks(updatedTasks); 
	};

	const clearAllTasks = async () => {
		const emptyTasks = [];
		setTasks(emptyTasks);
		await syncTasks(emptyTasks); 
	};

	return (
		<div className="container">
			<h1 className="text-center mt-5 title">Pendientes</h1>
			<div className="card">
				<div className="input-group">
					<input
						onChange={(e) => setTask({ ...task, label: e.target.value })}
						onKeyDown={addTask}
						value={task.label}
						type="text"
						className="form-control"
						placeholder="Pendientes"
					/>
				</div>
				<div className="ms-3">
					{tasks.length === 0 ? (
						<p>Sin tareas</p>
					) : (
						tasks.map((item) => (
							<div className="d-flex justify-content-between" key={item.id}>
								<li>{item.label}</li>
								<button className="btn me-3" onClick={() => removeTask(item.id)}>
									<i className="fas fa-window-close text-danger"></i> 
								</button>
							</div>
						))
					)}
				</div>
				<div className="card-footer">
					{tasks.length} Tareas
					<button className="btn btn-danger float-end" onClick={clearAllTasks}>
						Borrar Todo
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
