import express from "express";
import * as UserController from "../controllers/usersController";
import { requiresAuthentication } from "../middleware/authenticate";

const router = express.Router();

router.get("/", requiresAuthentication, UserController.getAuthenticatedUser);

router.post("/signup", UserController.userSignUp);

router.post("/login", UserController.userLogin);

router.post("/logout", UserController.userLogout);

export default router;
