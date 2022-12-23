import Express from "express";
import { signIn, signUp } from "../controllers/userController.js";
const router_user = Express.Router();

router_user.post("/signin", signIn);
router_user.post("/signup", signUp);

export default router_user;
