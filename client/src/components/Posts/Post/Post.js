import React, { useState } from "react";
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
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Post = ({ post, setCurrentId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("profile"));
	const [likes, setLikes] = useState(post?.likes);
	const hasLikedPost = post.likes.find((like) => like === userId);
	const userId = user?.result.googleId || user?.result?._id;

	const handleLike = async () => {
		dispatch(likePost(post._id));
	
		if (hasLikedPost) {
		  setLikes(post.likes.filter((id) => id !== userId));
		} else {
		  setLikes([...post.likes, userId]);
		}
	  };

	// Likes component
	const Likes = () => {
		console.log("Likes component");
		if (likes.length > 0) {
			return likes.find((like) => like === userId)
			  ? (
				<><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
			  ) : (
				<><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
			  );
		  }
	  
		  return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
	};
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
					<Typography variant="h6">{post.name}</Typography>
					<Typography variant="body2">
						{moment(post.createdAt).fromNow()}
					</Typography>
				</div>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<div className="overlay2">
						<Button
							style={{ color: "black" }}
							size="small"
							onClick={() => setCurrentId(post._id)}
						>
							<MoreHorizIcon fontSize="large" />
						</Button>
					</div>
				)}
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
					onClick={handleLike}
					disabled={!user?.result}
				>
					<Likes />
				</Button>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						size="small"
						color="primary"
						onClick={() => dispatch(deletePost(post._id))}
					>
						<DeleteIcon fontSize="small" /> &nbsp; Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
