import Express from "express";
import {
	getPosts,
	createPosts,
	updatePosts,
	deletePosts,
	likePosts,
	getPost,
} from "../controllers/postController.js";
import auth from "../middleware/authMiddle.js";
const router_var = Express.Router();

router_var.get("/", getPosts);
router_var.post("/", auth, createPosts);
router_var.patch("/:id", auth, updatePosts);
router_var.delete("/:id", auth, deletePosts);
router_var.patch("/:id/likePost", auth, likePosts);
// router_var.get("/");
// router_var.get("/:id", getPost);
export default router_var;
