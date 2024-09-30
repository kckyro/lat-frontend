import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/master/Layout";
import Splash from "./components/pages/Splash";
import Profile from "./components/pages/Profile";
import "./index.css";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path='/' element={<Splash />} />
					<Route path='/profile/:puuid' element={<Profile />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
