import Express from "express";
import { getPosts, createPosts, updatePosts, deletePosts } from "../controllers/postController.js";
const router_var = Express.Router();

router_var.get("/", getPosts);
router_var.post("/", createPosts);
router_var.patch("/:id", updatePosts);
router_var.delete("/:id", deletePosts);
router_var.get("/");
export default router_var;
