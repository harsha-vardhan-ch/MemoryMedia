import React from "react";
import Post from "./Post/Post.js";
import "./PostsStyle.css";

import { useSelector } from "react-redux";

import { Grid, CircularProgress } from "@mui/material";

const Posts = ({setCurrentId}) => {
	const posts = useSelector((state) => state.posts);		// fetching posts
	console.log(posts);
	console.log("In Posts.js file ");
	return !posts.length ? (
		<CircularProgress />
	) : (
		<Grid
			className="mainContainer"
			container
			alignItems="stretch"
			spacing={3}
		>
			{posts.map((post) => (
				<Grid key={post._id} item xs={12} sm={6} md={6}>
					<Post post={post} setCurrentId={setCurrentId} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
