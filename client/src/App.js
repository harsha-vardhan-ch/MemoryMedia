import React from "react";
import { Container } from "@mui/material";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import dotenv from "dotenv";
import { GoogleOAuthProvider } from '@react-oauth/google';

// dotenv.config();

const App = () => {
	const user = JSON.parse(localStorage.getItem("profile"));
	const GOOGLE_API_TOKEN = '246604659762-q51tb9afo1mvslgnkisdh5m908o47tve.apps.googleusercontent.com';
	return (
		<GoogleOAuthProvider clientId={GOOGLE_API_TOKEN}>
		<BrowserRouter>
			<Container maxWidth="xl">
				<Navbar />
				<Routes>
					<Route
						path="/"
						exact
						element={() => <Navigate to="/posts" />}
					/>
					<Route path="/posts" exact element={<Home />} />
					<Route path="/posts/search" exact element={<Home />} />
					<Route path="/posts/:id" element={<PostDetails />} />
					{/* <Route
						path="/auth"
						exact
						element={() =>
							!user ? <Auth /> : <Navigate to="/posts" />
						}
					/> */}
					<Route path="/auth" exact element={<Auth />} />
					{/* <Route path="/auth" exact element={() => (!user ? <Auth /> : <Navigate to="/posts" />)} /> */}
				</Routes>
			</Container>
		</BrowserRouter>
		</GoogleOAuthProvider>
	);
};
// hey there
export default App;
