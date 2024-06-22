import { RequestHandler } from "express";
import JournalEntryModel from "../models/journalEntry";

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
        const journalEntry = await JournalEntryModel.findById(
            journalEntryId
        ).exec();

        res.status(200).json(journalEntry);
    } catch (error) {
        next(error);
    }
};

export const createJournalEntry: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        const newJournalEntry = await JournalEntryModel.create({
            title,
            text,
        });

        res.status(201).json(newJournalEntry);
    } catch (error) {
        next(error);
    }
};
