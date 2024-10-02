import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div
			onClick={toggleTheme}
			className='w-14 h-8 flex items-center rounded-full p-1 cursor-pointer bg-gray-300 dark:bg-gray-700 transition duration-500 ease-in-out'
		>
			<div
				className={`transform duration-500 ease-in-out rounded-full bg-white w-6 h-6 flex items-center justify-center shadow-md ${
					theme === "dark" ? "translate-x-6" : ""
				}`}
			>
				{theme === "dark" ? (
					<MoonIcon className='w-4 h-4 text-yellow-300' />
				) : (
					<SunIcon className='w-4 h-4 text-yellow-500' />
				)}
			</div>
		</div>
	);
};

export default ThemeToggle;
