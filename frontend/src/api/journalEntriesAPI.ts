import { JournalEntryModel } from "../models/journalEntryModel";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, init);

    if (res.ok) {
        return res;
    } else {
        const errorBody = await res.json();
        const errorMsg = errorBody.message;
        throw Error(errorMsg);
    }
}

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
