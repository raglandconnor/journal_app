const cors = require("cors");
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import journalsRoutes from "./routes/journalsRoutes";
import usersRoutes from "./routes/usersRoutes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3500",
    })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(
    session({
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
        rolling: true,
        store: MongoStore.create({
            mongoUrl: env.MONGO_CONNECTION_STRING,
        }),
    })
);

app.use("/api/journals", journalsRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Resource not found"));
});

// Error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let statusCode = isHttpError(error) ? error.status : 500;
    let errorMsg = isHttpError(error)
        ? error.message
        : `An unknown error occurred (${statusCode})`;

    res.status(statusCode).json({ message: errorMsg });
});

export default app;
