import React, { useState } from "react";
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
import { useDispatch } from "react-redux";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signup, signin } from '../../actions/authActions';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: ''
}



const Auth = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [ formData, setformData ] = useState(initialState);

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const handleSubmit = (e) => {
		e.preventDefault();     // To stop, browser default behaviour of page reloading after form submitting.
		console.log(formData);

		if(isSignUp)
		{
			console.log("In user registration");
			dispatch(signup(formData, navigate));		//For new users registration
		}
		else{
			dispatch(signin(formData, navigate));		// For exisiting users signin
		}
	};

	const handleChange = (e) => {
		setformData({ ...formData, [e.target.name]: e.target.value });
	};

	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp);
		setShowPassword(false);
	};

	const googleSuccess = async (res) => {
		try {
			// console.log(res); // Prints JWT Token along with google client ID
			const token = res['credential'];
			const result = jwt_decode(res['credential']);    // Decoding JWT Token
			console.log(result,result['email']);
			dispatch({ type: 'AUTH', data: { result, token } });
			navigate("/posts");      // After dispatching, redirecting to / page
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
								name="confirmPassword"
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
					<GoogleLogin
						onSuccess={googleSuccess}
						onError={googleFailure}
						// cookiePolicy="single_host_origin"
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
