import React, { useState, useEffect } from "react";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";

export const Home = () => {
	const [newTask, setNewTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	const getTodos = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/todo/users/adrian');
			const data = await response.json();
			setTaskList(data.todos);

		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getTodos();
	}, []);

	const AddTask = async () => {
		if (newTask.trim() === "") return;

		try {
			const response = await fetch('https://playground.4geeks.com/todo/todos/adrian', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					label: newTask,
					done: false
				})
			});

			if (!response.ok) {
				throw new Error("Error al añadir tarea");
			}

			getTodos();
			setNewTask("");
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteTask = async (taskId) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Error al eliminar la tarea');
			}

			getTodos();
		} catch (err) {
			console.log(err);
		}
	};

	const allDeleteTask = async () => {
		if (taskList.length === 0) {
			console.log("No hay tareas para eliminar.");
			return;
		}
		for (const task of [...taskList]) {
			await handleDeleteTask(task.id);
		}
		getTodos();
	}

	return (
		<div className="container">
			<TaskInput
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
				onAdd={AddTask}
				onDeleteAll={allDeleteTask}
			/>
			<TaskList tasks={taskList} onDelete={handleDeleteTask} />
		</div>
	);
};