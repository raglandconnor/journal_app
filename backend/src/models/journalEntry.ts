import { InferSchemaType, Schema, model } from "mongoose";

const journalEntrySchema = new Schema(
    {
        title: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    { timestamps: true }
);

type JournalEntry = InferSchemaType<typeof journalEntrySchema>;

export default model<JournalEntry>("JournalEntry", journalEntrySchema);
