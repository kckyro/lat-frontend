import React from "react";
import SearchBox from "./Searchbox";

const Splash = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>			
			<SearchBox className='w-full max-w-md' />
		</div>
	);
};

export default Splash;
