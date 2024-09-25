import React, { useState, useEffect } from "react";
import "./index.css";
import SearchBox from "./components/Searchbox";

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
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>
			<button
				onClick={() => setDarkMode(!darkMode)}
				className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800'
			>
				Toggle {darkMode ? "Light" : "Dark"} Mode
			</button>
			<SearchBox className='w-full max-w-md' />
		</div>
	);
}

export default App;
