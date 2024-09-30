import React from "react";

const ToggleButton = ({ darkMode, setDarkMode }) => {
	return (
		<button
			onClick={() => setDarkMode((prev) => !prev)}
			className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800'
		>
			Toggle {darkMode ? "Light" : "Dark"} Mode
		</button>
	);
};

export default ToggleButton;
