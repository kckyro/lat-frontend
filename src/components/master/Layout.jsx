import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<div className='flex flex-col h-screen bg-gray-100'>
			<Navbar />
			<main className='flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
