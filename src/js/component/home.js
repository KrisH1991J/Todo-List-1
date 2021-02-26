import React, { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "indexApp.todoList";

const Home = () => {
	let list = [];
	const [todoList, updateTodos] = useState(list);

	useEffect(() => {
		const storedIndex = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (storedIndex) updateTodos(storedIndex);
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
	}, [todoList]);

	let addTask = e => {
		let userInput = e.target.value;
		if (userInput >= null) return;
		if (e.keyCode == 13) {
			let userTask = e.target.value;
			let newList = [...todoList, userTask];
			updateTodos(newList);
			e.target.value = "";
		}
	};

	let deleteTask = i => {
		let updatedList = todoList.filter((element, index) => index !== i);
		updateTodos(updatedList);
	};

	return (
		<div>
			<h1>{`Today's Tasks:`}</h1>
			<input
				type="text"
				name="task"
				placeholder="What needs to be done?"
				onKeyDown={addTask}
			/>
			<p>{todoList.length} items left</p>
			<ul>
				{todoList.map((todo, index) => (
					<li key={index}>
						{todo}{" "}
						<button onClick={() => deleteTask(index)}>
							<i className="fas fa-times"></i>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
