import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/master/Layout";
import Splash from "./components/pages/Splash";
import Profile from "./components/pages/Profile";
import "./index.css";
import { ThemeProvider } from "./components/context/ThemeContext";

function App() {
	return (
		<Router>
			<ThemeProvider>
				<Layout>
					<Routes>
						<Route path='/' element={<Splash />} />
						<Route path='/profile/:puuid' element={<Profile />} />
					</Routes>
				</Layout>
			</ThemeProvider>
		</Router>
	);
}

export default App;
