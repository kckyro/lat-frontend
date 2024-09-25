import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";
import { debounce } from "lodash";

const SearchBox = ({ className = "" }) => {
	const [gameName, setGameName] = useState("");
	const [tagLine, setTagLine] = useState("");
	const [user, setUser] = useState(null);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const fetchUser = useCallback(async (gameName, tagLine) => {
		if (gameName.length > 0 && tagLine.length > 0) {
			setIsLoading(true);
			try {
				const response = await axios.get(
					`http://localhost:5125/api/search?gameName=${encodeURIComponent(
						gameName
					)}&tagLine=${encodeURIComponent(tagLine)}`
				);
				console.log(response.data);
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user", error);
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		} else {
			setUser(null);
		}
	}, []);

	const debouncedFetchUserRef = useRef(
		debounce((gameName, tagLine) => fetchUser(gameName, tagLine), 300)
	);

	const debouncedFetchUser = useCallback((gameName, tagLine) => {
		debouncedFetchUserRef.current(gameName, tagLine);
	}, []);

	const handleGameNameChange = (e) => {
		setGameName(e.target.value);
		debouncedFetchUser(e.target.value, tagLine);
	};

	const handleTagLineChange = (e) => {
		setTagLine(e.target.value);
		debouncedFetchUser(gameName, e.target.value);
	};

	const handleSelect = (user) => {
		navigate(`/profile/${user.puuid}`);
	};

	return (
		<div className={`relative w-full max-w-md ${className}`}>
			<div className='relative flex'>
				<input
					type='text'
					value={gameName}
					onChange={handleGameNameChange}
					onFocus={() => setIsInputFocused(true)}
					onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
					placeholder='Game Name'
					className='w-full px-4 py-2 border-r-0 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500'
				/>
				<input
					type='text'
					value={tagLine}
					onChange={handleTagLineChange}
					onFocus={() => setIsInputFocused(true)}
					onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
					placeholder='Tag Line'
					className='w-1/3 px-4 py-2 border-l-0 rounded-r-full focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500'
				/>
				<div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300'>
					{isLoading ? (
						<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-white'></div>
					) : (
						<Search size={20} />
					)}
				</div>
			</div>
			{isInputFocused && user && (
				<div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white'>
					<div
						className='flex items-center cursor-pointer'
						onClick={() => handleSelect(user)}
					>
						<img
							src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/${user.profileIconId}.png`}
							alt='Profile Icon'
							className='w-12 h-12 rounded-full mr-4'
						/>
						<div>
							<p className='font-bold'>
								{user.gameName}#{user.tagLine}
							</p>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								Level: {user.summonerLevel}
							</p>
						</div>
					</div>
				</div>
			)}
			{isInputFocused &&
				!user &&
				!isLoading &&
				gameName.length > 0 &&
				tagLine.length > 0 && (
					<div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-4 text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'>
						No user found...
					</div>
				)}
		</div>
	);
};

export default SearchBox;
