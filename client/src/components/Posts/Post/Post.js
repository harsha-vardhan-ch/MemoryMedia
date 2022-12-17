import React from "react";
import "./PostStyle.css";

import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	ButtonBase,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const openPost = () => {
		navigate(`/posts/${post._id}`);
	};
	return (
		<Card className="card">
			<ButtonBase className="cardAction" onClick={openPost}>
				<CardMedia
					className="media"
					image={
						post.selectedFile ||
						"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
					}
					title={post.title}
				/>
				<div className="overlay">
					<Typography variant="h6">{post.creator}</Typography>
					{/* <Typography variant="body2">
					{moment(post.createdAt).fromNow()}
				</Typography> */}
				</div>
				<div className="overlay2">
					<Button
						style={{ color: "white" }}
						size="small"
						onClick={() => setCurrentId(post._id)}
					>
						<MoreHorizIcon fontSize="default" />
					</Button>
				</div>
				{/* <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div> */}
				<Typography
					className="title"
					gutterBottom
					variant="h5"
					component="h2"
				>
					{post.title}
				</Typography>
				<CardContent>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						{post.message}
					</Typography>
				</CardContent>
			</ButtonBase>
			<CardActions className="cardActions">
				<Button
					size="small"
					color="primary"
					onClick={() => dispatch(likePost(post._id))}
				>
					<ThumbUpIcon fontSize="small" /> &nbsp; Like &nbsp;{" "}
					{post.likeCount}{" "}
				</Button>
				<Button
					size="small"
					color="primary"
					onClick={() => dispatch(deletePost(post._id))}
				>
					<DeleteIcon fontSize="small" /> &nbsp; Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default Post;
