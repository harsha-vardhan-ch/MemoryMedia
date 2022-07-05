import Express from "express";
import { getPosts } from "../controllers/postController.js";
const router_var = Express.Router();

router_var.get('/', getPosts )

router_var.get('/', );
export default router_var;