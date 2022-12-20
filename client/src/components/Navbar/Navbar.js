import React, { useState, useEffect } from "react";
import "./NavbarStyle.css";
import { Typography, AppBar, Toolbar, Button, Avatar } from "@mui/material";
import memories from "../../images/memories.png";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [user, setUser]=useState(JSON.parse(localStorage.getItem('profile')));
	console.log('++++++++++++++++',user)

	useEffect(()=>{
		const token = user?.token;


		//JWT For manual signups

		setUser(JSON.parse(localStorage.getItem('profile')));
	},[]);
	return (
		<AppBar className="appBar" position="static" color="inherit">
			<div className="brandContainer">
				<Typography
					component={Link}
					to="/"
					className="heading"
					variant="h2"
					align="center"
				>
					Memories
				</Typography>
				<img
					className="imgclass"
					src={memories}
					alt="memory_image"
					height="60"
					width="60"
				/>
			</div>
			<Toolbar className="toolbar">{
				user ? ( 
					<div className="profile">
						<Avatar className="purple" alt={user.result.name} src={user.result.imageUrl} >
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className="userName" variant="h6" >
							{user.result.name}
						</Typography>
						<Button className="logout" color="secondary" variant="contained">
								Logout 
						</Button>
					</div>
				): ( 
					<Button component = {Link } to ="/auth" variant="contained" color="primary">Sign In</Button>
				)
			}</Toolbar>
		</AppBar>
	);
};

export default Navbar;
