// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => {console.log(error);})
	});

	function deleteUser(user) {
		const promise = fetch("http://localhost:8000/users/id", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user)
		});
		return promise
	}

	function removeOneCharacter(index) {
		const updated = characters.filter((character, i) => {
			return i !== index;
		});
		const user = characters[index]
		console.log(updated);
		deleteUser(user)
			.then(() => setCharacters(updated))
			.catch((error) => {
				console.log(error);
			})
	}

	function postUser(person) {
		const promise = fetch("http://localhost:8000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(person),
		});
		return promise;
	}

	function updateList(person) {
		postUser(person)
			.then(() => setCharacters([...characters, person]))
			.catch((error) => {
				console.log(error);
			})
	}

	function fetchUsers() {
		const promise = fetch("http://localhost:8000/users");
		return promise;
	}

	return (
		<div className="container">
			<Table 
				characterData={characters}
				removeCharacter={removeOneCharacter}
			/>
			<Form handleSubmit={updateList}/>
		</div>
	);
}

export default MyApp;
	<h1>Hello, React!</h1>
