import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import JournalEntryModel from "./models/journalEntry";

const app = express();

app.get("/", async (req, res, next) => {
    // Use try catch to handle errors
    try {
        const journalEntries = await JournalEntryModel.find().exec();
        res.status(200).json(journalEntries);
    } catch (error) {
        next(error);
    }
});

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
