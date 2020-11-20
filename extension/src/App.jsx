import './App.scss';
import React, { useState, useEffect } from 'react';
import SaveArticle from "./components/SaveArticle";
import Login from "./components/Login";

function App(props) {
	const [user, setUser] = useState('');

	const storeUser = (user) => {
		localStorage.setItem('username', user);
		setUser(user);
	};

	useEffect(() => {
		const stored = localStorage.getItem('username');
		if (stored) {
			setUser(stored)
		}
	})

	return (<div className="App">
		{
			!user ?
			<Login setUser={storeUser}/>
			:
			<SaveArticle user={user} />
		}
	</div>)
}

export default App
