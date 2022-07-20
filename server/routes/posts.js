import Express from "express";
import { getPosts, createPosts, updatePosts, deletePosts, likePosts, getPost } from "../controllers/postController.js";
const router_var = Express.Router();

router_var.get("/", getPosts);
router_var.post("/", createPosts);
router_var.patch("/:id", updatePosts);
router_var.delete("/:id", deletePosts);
router_var.patch("/:id/likePost", likePosts);
router_var.get("/");
router_var.get("/:id", getPost);
export default router_var;
