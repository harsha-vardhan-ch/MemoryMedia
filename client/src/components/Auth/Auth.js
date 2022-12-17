import React, { useState, useEffect } from "react";
import {
	Avatar,
	Grid,
	Paper,
	Typography,
	Button,
	Container,
} from "@mui/material";

import "./AuthStyles.css";
import LockIcon from "@mui/icons-material/Lock";

import Input from "./Input.js";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

const loadScript = (src) =>
	new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${src}"]`)) return resolve();
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => resolve();
		script.onerror = (err) => reject(err);
		document.body.appendChild(script);
	});

const Auth = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	
	const dispatch = useDispatch();

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const handleSubmit = () => {};

	const handleChange = () => {};

	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp);
		handleShowPassword(false);
	};

	useEffect(() => {
		/* Global google */

		const src = "https://accounts.google.com/gsi/client";
		// const src="https://web.archive.org/web/20220710213734/https://accounts.google.com/gsi/client";
		console.log(src);
		loadScript(src)
			.then(() => {
				// // console.log(google);
				// google.accounts.id.initialize({
				// 	client_id:
				// 		"246604659762-q51tb9afo1mvslgnkisdh5m908o47tve.apps.googleusercontent.com",
				// 	callback: handleGoogleCallResponse,
				// });
				// google.accounts.id.renderButton(
				// 	document.getElementById("googleDiv"),
				// 	{ theme: "outline", size: "large" }
				// );
				// google.accounts.id.prompt();
			})
			.catch(console.error);
	}, []);

	function handleGoogleCallResponse(response) {
		console.log("JWT Token is : " + response.credential);
		const token = response.credential;
		var userObject = jwt_decode(response.credential);
		// console.log(userObject);
		try{
			console.log(" In try 1");
			dispatch({ type:'AUTH', data:{ userObject, token}});    // Since we are dispatching here, we need to add a reducer 
			console.log(" In try 2");
		}
		catch(error){
			console.log("error");
		}
		
		document.getElementById("googleDiv").hidden = true;
	}

	function handleSignOut(event){
		
		document.getElementById("googleDiv").hidden = false;
	}
	const googleSuccess = (res) => {
		console.log(res);
	};

	const googleFailure = (res) => {
		console.log(" Google Sign in Failed. Try again ");
	};
	return (
		<Container component="main" maxWidth="xs">
			<Paper className="paper" elevation={3}>
				<Avatar>
					<LockIcon />
				</Avatar>
				<Typography variant="h5">
					{isSignUp ? "Sign Up" : "Sign In"}
				</Typography>
				<form className="form-style" onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							handleChange={handleChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignUp && (
							<Input
								name="confirm Password"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
							/>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className="btn-submit"
						onClick={() => {}}
					>
						{isSignUp ? "Sign Up" : "Sign In"}
					</Button>
					<div id="googleDiv">
						{/* {user && 
							<div>
								<img src={user?.picture}></img>
								<h3>{user?.name}</h3>
							</div>
						} */}
					</div>
					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignUp
									? "Already have an account ? Sign In"
									: "Don't have an account? Sign Up"}{" "}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
