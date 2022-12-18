import React from "react";
import { Container } from "@mui/material";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
	// const classes = useStyles();
	const user = JSON.parse(localStorage.getItem("profile"));
	return (
		<GoogleOAuthProvider clientId={process.env.GOOGLE_API_TOKEN}>
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
					<Route path="/auth" exact element={() => (!user ? <Auth /> : <Navigate to="/posts" />)} />
				</Routes>
			</Container>
		</BrowserRouter>
		</GoogleOAuthProvider>
	);
};
// hey there
export default App;
