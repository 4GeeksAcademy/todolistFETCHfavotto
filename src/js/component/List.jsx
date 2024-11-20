import React, { useEffect } from "react";

export const List = ({ todos, setTodos, deleteTodo }) => {

    
    
    const deleteTask = async (selectedTodoId) => {
        let updatedTodos = todos.filter(todo => todo.id !== selectedTodoId);
        setTodos(updatedTodos);

        const response = await fetch(`https://playground.4geeks.com/todo/todos/${selectedTodoId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
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

    return (
        <ul className="list-group">
            {todos?.map((todo) => 
                <li key={todo.id} className="list-group-item">{todo.label} <button className="trash" onClick={() => deleteTask(todo.id)}>x</button></li>
        )}
            <li className="list-group-item">{!todos ? "No Task, add a Task" : todos.length == 1 ? "1 Item left" : todos.length + " Items left"}</li>
        </ul>
    )
}
