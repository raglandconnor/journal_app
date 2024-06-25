import express from "express";
import * as UserController from "../controllers/usersController";

const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);

router.post("/signup", UserController.userSignUp);

router.post("/login", UserController.userLogin);

router.post("/logout", UserController.userLogout);

export default router;
