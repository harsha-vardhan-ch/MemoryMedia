export default (posts = [], action) => {
	switch (action.type) {
		case "FETCH_ALL":
			return action.payload;
		case "FETCH_POST":
			return action.payload;
		case "CREATE":
			return [...posts, action.payload];     // spread the posts and save new post in action . payload
		case "UPDATE":
		case "LIKE":
			return posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		case "DELETE":
			return posts.filter((post) => post._id !== action.payload);
		// case "LIKE":
		// 	return posts.map((post) =>
		// 		post._id === action.payload._id ? action.payload : post
		// 	);
		default:
			return posts;
	}
};
