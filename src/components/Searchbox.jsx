import React, { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const SearchBox = ({ className = "" }) => {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [isInputFocused, setIsInputFocused] = useState(false);

	const handleInputChange = async (event) => {
		const value = event.target.value;
		setQuery(value);

		if (value.length > 2) {
			try {
				const response = await axios.get(
					`http://localhost:5125/api/search?query=${value}`
				);
				setSuggestions(response.data);
			} catch (error) {
				console.error("Error fetching suggestions", error);
			}
		} else {
			setSuggestions([]);
		}
	};

	const handleSelect = (user) => {
		// TODO: Once the profile endpoints are wired up, this will need adjustment
		window.location.href = `/profile/${user.username}`;
	};

	return (
		<div className={`relative w-full max-w-md ${className}`}>
			<div className='relative'>
				<input
					type='text'
					value={query}
					onChange={handleInputChange}
					onFocus={() => setIsInputFocused(true)}
					onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
					placeholder='Search for league account'
					className='w-full px-4 py-2 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500'
				/>
				<Search
					className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300'
					size={20}
				/>
			</div>
			{isInputFocused && suggestions.length > 0 && (
				<ul className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700'>
					{suggestions.map((user) => (
						<li
							key={user.id}
							onClick={() => handleSelect(user)}
							className='px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white'
						>
							{user.username}
						</li>
					))}
				</ul>
			)}
			{isInputFocused && suggestions.length === 0 && query.length > 2 && (
				<div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-4 text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'>
					Nothing found yet...
				</div>
			)}
		</div>
	);
};

export default SearchBox;
