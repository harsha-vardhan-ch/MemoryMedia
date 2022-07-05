import Express from "express";
import { getPosts, createPosts } from "../controllers/postController.js";
const router_var = Express.Router();

router_var.get('/', getPosts )
router_var.post('/', createPosts )
router_var.get('/', );
export default router_var;