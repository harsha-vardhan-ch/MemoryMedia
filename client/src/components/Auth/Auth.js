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

import { GoogleLogin } from "@react-oauth/google";

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

	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		try {
			console.log(res);
			// dispatch({ type: 'AUTH', data: { result, token } });
			// history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (error) => {
		console.log(error);
		console.log(" Google Sign in Failed. Try again ");
	};
	return (
		<Container component="main" maxWidth="xs">
			<Paper className="paper" elevation={3}>
				<Avatar>
					<LockIcon />
					<h1>Hello</h1>
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
									name="lastName"
									label="Last Name"
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
						{isSignUp && 
							<Input
								name="confirm Password"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
							/>
						}
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
					{/* <div id="googleDiv"> */}
						{/* {user && 
							<div>
								<img src={user?.picture}></img>
								<h3>{user?.name}</h3>
							</div>
						} */}
					{/* </div> */}
					<GoogleLogin
						onSuccess={googleSuccess}
						onError={googleFailure}
						cookiePolicy="single_host_origin"
						text="Sign in With google"
					/>
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
