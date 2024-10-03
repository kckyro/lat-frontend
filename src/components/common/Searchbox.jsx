import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";
import { debounce } from "lodash";

const SearchBox = ({ className = "" }) => {
	const [gameName, setGameName] = useState("");
	const [tagLine, setTagLine] = useState("");
	const [user, setUser] = useState(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const navigate = useNavigate();
	const dropdownRef = useRef(null);

	const fetchUser = useCallback(async (gameName, tagLine) => {
		if (gameName.length > 0 && tagLine.length > 0) {
			setIsLoading(true);
			setHasSearched(false);
			try {
				const response = await axios.get(
					`http://localhost:5125/api/search?gameName=${encodeURIComponent(
						gameName
					)}&tagLine=${encodeURIComponent(tagLine)}`
				);
				console.log(
					`sent axios request to: http://localhost:5125/api/search?gameName=${encodeURIComponent(
						gameName
					)}/tagLine=${encodeURIComponent(tagLine)}`
				);
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user", error);
				setUser(null);
			} finally {
				setIsLoading(false);
				setHasSearched(true);
				setShowDropdown(true);
			}
		} else {
			setUser(null);
			setHasSearched(false);
			setShowDropdown(false);
		}
	}, []);

	const debouncedFetchUser = useCallback(
		debounce((gameName, tagLine) => fetchUser(gameName, tagLine), 300),
		[fetchUser]
	);

	const handleGameNameChange = (e) => {
		setGameName(e.target.value);
		debouncedFetchUser(e.target.value, tagLine);
	};

	const handleTagLineChange = (e) => {
		setTagLine(e.target.value);
		debouncedFetchUser(gameName, e.target.value);
	};

	const handleSelect = (user) => {
		navigate(`/profile/${user.gameName}/${user.tagLine}`);
		setShowDropdown(false);
	};

	const handleClickOutside = useCallback(
		(event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		},
		[showDropdown]
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);

	return (
		<div className={`relative ${className}`} ref={dropdownRef}>
			<div className='relative flex'>
				<input
					type='text'
					value={gameName}
					onChange={handleGameNameChange}
					onFocus={() => setShowDropdown(true)}
					placeholder='Game Name'
					className='w-full px-4 py-2 border border-r-0 rounded-l-full focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200'
				/>
				<input
					type='text'
					value={tagLine}
					onChange={handleTagLineChange}
					onFocus={() => setShowDropdown(true)}
					placeholder='Tag Line'
					className='w-1/3 px-4 py-2 border border-l-0 rounded-r-full focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200'
				/>
				<div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300'>
					{isLoading ? (
						<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-white'></div>
					) : (
						<Search size={20} />
					)}
				</div>
			</div>
			{showDropdown && hasSearched && !isLoading && (
				<div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white'>
					{user ? (
						<div
							className='flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors duration-200'
							onClick={() => handleSelect(user)}
						>
							<div>
								<p className='font-bold'>
									{user.gameName}#{user.tagLine}
								</p>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Level: {user.summonerLevel}
								</p>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Profile Id: {user.profileIconId}
								</p>
							</div>
						</div>
					) : (
						<div className='text-gray-500 dark:text-gray-300'>
							No user found...
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchBox;
