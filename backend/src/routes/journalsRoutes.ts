import express from "express";
import * as JournalsController from "../controllers/journalsController";

const router = express.Router();

router.get("/", JournalsController.getJournalEntries);

router.get("/:journalEntryId", JournalsController.getJournalEntry);

router.post("/", JournalsController.createJournalEntry);

export default router;
