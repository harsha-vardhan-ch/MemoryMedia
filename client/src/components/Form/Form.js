import React, { useState, useEffect } from "react";
import "./FormStyle.css";
import { TextField, Paper, Typography, Button } from "@mui/material";
import FileBase from "react-file-base64";

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});
	const post = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null
	); // fetching posts
	const user = JSON.parse(localStorage.getItem("profile"));

	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]); // [ post ] => useeffect shoulb be triggered whenever post is updated.
	const dispatch = useDispatch(); // Allows to dispatch actions

	const handleSubmit = async (e) => {
		console.log("In handle Submit");
		e.preventDefault(); // to prevent browser refresh
		console.log(postData);

		if (currentId) {
			dispatch(
				updatePost(currentId, { ...postData, name: user?.result?.name })
			);
		} else {
			dispatch(createPost({ ...postData, name: user?.result?.name })); // send the dispatch request with user entered data
		}
		clear();
	};

	if (!user?.result?.name) {
		return (
			<Paper className="paperstyle" elevation={6}>
				<Typography variant="h6" align="center">
					Sign In to create and like posts!
				</Typography>
			</Paper>
		);
	}

	const clear = () => {
		setCurrentId(null);
		setPostData({
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	return (
		<Paper className="paperstyle">
			<form
				className="root formcss"
				onSubmit={handleSubmit}
				autoComplete="off"
				noValidate
			>
				<Typography variant="h6">
					{" "}
					{currentId ? "Edit" : "Create"} Memory{" "}
				</Typography>
				{/* <TextField
					name="creator"
					variant="outlined"
					label="Creator"
					value={postData.creator}
					onChange={(e) => {
						setPostData({ ...postData, creator: e.target.value }); // Only last value mentioned changes. Remaining are retrieved
					}}
					fullwidth="true"
				/> */}
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					value={postData.title}
					onChange={(e) => {
						setPostData({ ...postData, title: e.target.value }); // Change Only the edited field. Remaining are not modified
					}}
					fullwidth="true"
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					value={postData.message}
					onChange={(e) => {
						setPostData({ ...postData, message: e.target.value }); // Only last value mentioned changes. Remaining are retrieved
					}}
					fullwidth="true"
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					value={postData.tags}
					onChange={(e) => {
						setPostData({
							...postData,
							tags: e.target.value.split(","),
						}); // Only last value mentioned changes. Remaining are retrieved
					}}
					fullwidth="true"
				/>
				<div className="fileinput">
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className="buttonsubmit"
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
