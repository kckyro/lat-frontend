import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Splash from "./components/Splash";
import Profile from "./components/Profile";

function App() {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<Router>
			<button
				onClick={() => setDarkMode(!darkMode)}
				className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800'
			>
				Toggle {darkMode ? "Light" : "Dark"} Mode
			</button>
			<Routes>
				<Route path='/' element={<Splash />} />
				<Route path='/profile/:puuid' element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
