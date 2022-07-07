import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (err) {
		res.status(404).json(err.message);
	}
	// res.send("Working through controller bro");
};

export const createPosts = (req, res) => {
	const post = req.body;

	const newPost = new PostMessage(post);
	try {
		newPost.save();
		res.status(201).json(newPost);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
	// res.send("Post creation bro ");
};

export const updatePosts = async (req, res) => {

	const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);

};

export const deletePosts = async (req, res) => {

	const { id } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({message:"Delete succesful "});

};