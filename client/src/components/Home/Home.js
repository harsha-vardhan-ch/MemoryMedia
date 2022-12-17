import React, { useEffect, useState } from "react";
import { Container, Grid, Grow, Paper } from "@mui/material";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Pagination from "../Pagination/Pagination.js";

const Home = () => {
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(null);
	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);      // Trigger useffect when currentid is changed ( currentid is set to null by clear function after post update in form.js )
 	return (
		<Grow in>
			{/* When hovered over a post it shoudld enlarge and give more detailed description of post   */}
			<Container>
				<Grid
					container
					justify="space-between"
					alignItems="stretch"
					spacing={4}
					className="mainContainer"
				>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form
							currentId={currentId}
							setCurrentId={setCurrentId}
						/>
						<Paper className="" elevation={6}>
							<Pagination />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
