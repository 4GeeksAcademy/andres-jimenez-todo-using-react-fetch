import React, { useEffect, useState } from "react";
import { TodoInput } from "./ToDoInput";


//create your first component
const Home = () => {
	const [toDoList, setToDoList] = useState([])

	const deleteToDo = async (todoId) => {
		let response = await fetch('https://playground.4geeks.com/todo/todos/' + todoId, {
			method: "DELETE",
		})

		if (response.status == 204) {
			getToDoList()
		}
		else {
			console.log("error:", response.status, response.statusText)
		}


	}
	const addToDo = async (todo) => {
		let response = await fetch('https://playground.4geeks.com/todo/todos/ajprocess', {
			method: "POST",
			body: JSON.stringify(todo),
			headers: {
				"Content-Type": "application/json"
			}
		})
		if (response.status == 201) {
			let data = await response.json()
			console.log(data)
			getToDoList()
		}
		else {
			console.log("error:", response.status, response.statusText)
		}


	}
	function createUser() {
		fetch('https://playground.4geeks.com/todo/todos/ajprocess', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})

			.then(response => {
				console.log(response.ok);
				console.log(response.status);
				console.log(response.text());
				return response.json();
			})
			.then(data => {
				console.error(error);
			});
	}
	const getToDoList = async () => {
		let response = await fetch('https://playground.4geeks.com/todo/todos/ajprocess', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})

		if (response.status == 404) {
			createUser()
		} else if (response.status == 200) {
			let data = await response.json()
			setToDoList(data.todos)
		} else {
			alert("There seem to be an issue retrieving your todos at the moment, please try again later...")
		}

	}
	useEffect(() => {
		getToDoList()
	}, [])

	return (
		<div className="container d-flex flex-column jutify-content-center align-items-center">
			<h1 className="alert text-secondary">To Do's</h1>
			<TodoInput toDoList={toDoList} setToDoList={setToDoList} addToDo={addToDo} />
			{toDoList.map((value, index) =>
				<div className="alert alert-dark col-6 d-flex justify-content-between">
					<p> {value, label} </p>
					<span onClick={() => deleteToDo(value.id)} className="deleteButton btn btn-secondary"> X </span>
				</div>)}
			<div className="alert alert-info col-6 d-flex text-info justify-content-center">
				{
					toDoList.length == 0 ? "No Task Added. Enter a New Task." : getToDoList.length == 1 ? "1 Task Left" : toDoList.length + "Tasks Left"
				}
			</div>
		</div>
	);
};

export default Home;