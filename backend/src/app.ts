import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import journalsRoutes from "./routes/journalsRoutes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/journals", journalsRoutes);

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
