import React, { useEffect } from "react";
import "./PostDetailsStyles.css";

import { Paper, Typography, Divider, CircularProgress } from "@mui/material/";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { borderRadius } from "@mui/system";
import { getPost } from "../../actions/posts";

const PostDetails = () => {
	const [post, posts, isLoading] = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getPost(id));
	}, [id]);

	if (!post) {
		return null;
	}

	if (isLoading) {
		return (
			<Paper>
				<CircularProgress size="7em" />
			</Paper>
		);
	}
	return (
		<Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
			<div className="card">
				<div className="section">
					<Typography variant="h3" component="h2">
						{post.title}
					</Typography>
					<Typography
						gutterBottom
						variant="h6"
						color="textSecondary"
						component="h2"
					>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
					<Typography gutterBottom variant="body1" component="p">
						{post.message}
					</Typography>
					<Typography variant="h6">
						Created by: {post.name}
					</Typography>
					<Typography variant="body1">
						{/* {moment(post.createdAt).fromNow()} */}
					</Typography>
					<Divider style={{ margin: "20px 0" }} />
					<Typography variant="body1">
						<strong>Realtime Chat - coming soon!</strong>
					</Typography>
					<Divider style={{ margin: "20px 0" }} />
					<Typography variant="body1">
						<strong>Comments - coming soon!</strong>
					</Typography>
					<Divider style={{ margin: "20px 0" }} />
				</div>
				<div className="imageSection">
					<img
						className="media"
						src={
							post.selectedFile ||
							"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
						}
						alt={post.title}
					/>
				</div>
			</div>
		</Paper>
	);
};

export default PostDetails;
