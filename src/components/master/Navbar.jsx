import React from "react";
import { Link } from "react-router-dom";
import ToggleButton from "../common/ToggleButton";
import { useDarkMode } from "../../hooks/useDarkMode";

const Navbar = () => {
	const [darkMode, setDarkMode] = useDarkMode();

	return (
		<nav className='bg-gray-800 text-white'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<Link to='/' className='text-xl font-bold'>
						League <em>Analytics</em>
					</Link>
					<div className='flex space-x-4'>
						<ToggleButton />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
