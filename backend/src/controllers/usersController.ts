import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        if (!authenticatedUserId)
            throw createHttpError(401, "User not authenticated.");

        const user = await UserModel.findById(authenticatedUserId)
            .select("+email")
            .exec();

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    username?: string;
    email?: string;
    password?: string;
}

export const userSignUp: RequestHandler<
    unknown,
    unknown,
    SignUpBody,
    unknown
> = async (req, res, next) => {
    const { username, email } = req.body;
    const rawPassword = req.body.password;

    try {
        if (!username || !email || !rawPassword)
            throw createHttpError(400, "Missing parameters");

        const existingUsername = await UserModel.findOne({
            username: username,
        }).exec();
        if (existingUsername) throw createHttpError(409, "Username taken.");

        const existingEmail = await UserModel.findOne({
            email: email,
        }).exec();
        if (existingEmail)
            throw createHttpError(
                409,
                "A user with this email address already exists. "
            );

        const hashedPassword = await bcrypt.hash(rawPassword, 10);
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string;
    password?: string;
}

export const userLogin: RequestHandler<
    unknown,
    unknown,
    LoginBody,
    unknown
> = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (!username || !password)
            throw createHttpError(400, "Missing parameters.");

        const user = await UserModel.findOne({ username })
            .select("+password +email")
            .exec();

        if (!user) throw createHttpError(401, "Invalid credentials");

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) throw createHttpError(401, "Invalid credentials");

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const userLogout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) next(error);
        else res.sendStatus(200);
    });
};
