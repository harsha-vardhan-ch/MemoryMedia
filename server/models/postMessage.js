import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	name:String,    //  name of the person who logged in
	creator: String,
	tags: [String],
	selectedFile: String,
	// likeCount: {
	// 	type: Number,
	// 	default: 0,
	// },
	likes:{
		type: [String],
		default: [],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const PostMessage = mongoose.model("postMessage", postSchema);

export default PostMessage;
