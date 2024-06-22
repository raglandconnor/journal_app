import { RequestHandler } from "express";
import JournalEntryModel from "../models/journalEntry";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getJournalEntries: RequestHandler = async (req, res, next) => {
    // Use try catch to handle errors
    try {
        const journalEntries = await JournalEntryModel.find().exec();
        res.status(200).json(journalEntries);
    } catch (error) {
        next(error);
    }
};

export const getJournalEntry: RequestHandler = async (req, res, next) => {
    const journalEntryId = req.params.journalEntryId;
    try {
        if (!mongoose.isValidObjectId(journalEntryId))
            throw createHttpError(400, "Invalid journal entry ID");

        const journalEntry = await JournalEntryModel.findById(
            journalEntryId
        ).exec();

        if (!journalEntry) {
            throw createHttpError(404, "Journal entry not found");
        }

        res.status(200).json(journalEntry);
    } catch (error) {
        next(error);
    }
};

interface CreateJournalEntryBody {
    title?: string;
    text?: string;
}

export const createJournalEntry: RequestHandler<
    unknown,
    unknown,
    CreateJournalEntryBody,
    unknown
> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            throw createHttpError(400, "Journal entry title is required");
        }

        const newJournalEntry = await JournalEntryModel.create({
            title,
            text,
        });

        res.status(201).json(newJournalEntry);
    } catch (error) {
        next(error);
    }
};
