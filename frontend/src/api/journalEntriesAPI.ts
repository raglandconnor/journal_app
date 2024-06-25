import { JournalEntryModel } from "../models/journalEntryModel";
import fetchData from "../utils/fetchData";

export async function fetchJournals(): Promise<JournalEntryModel[]> {
    const res = await fetchData("/api/journals", {
        method: "GET",
    });

    return res.json();
}

export interface JournalEntryInput {
    title: string;
    text?: string;
}

export async function createJournal(
    journalEntry: JournalEntryInput
): Promise<JournalEntryModel> {
    const res = await fetchData("/api/journals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(journalEntry),
    });

    return res.json();
}

export async function updateJournalEntry(
    journalEntryId: string,
    journalEntry: JournalEntryInput
): Promise<JournalEntryModel> {
    const res = await fetchData(`/api/journals/${journalEntryId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(journalEntry),
    });
    return res.json();
}

export async function deleteJournal(journalId: string) {
    await fetchData(`/api/journals/${journalId}`, { method: "DELETE" });
}
