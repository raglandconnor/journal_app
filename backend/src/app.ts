import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import journalsRoutes from "./routes/journalsRoutes";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/journals", journalsRoutes);

app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});

// Error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMsg = "An unknown error occurred";
    if (error instanceof Error) {
        errorMsg = error.message;
    }

    res.status(500).json({
        error: errorMsg,
    });
});

export default app;
