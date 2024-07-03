import { InferSchemaType, Schema, model } from "mongoose";
import encrypt from "mongoose-encryption";
import env from "../util/validateEnv";

const journalEntrySchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
        title: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    { timestamps: true }
);

journalEntrySchema.plugin(encrypt, {
    secret: env.SECRET_KEY,
    encryptedFields: ["title", "text"],
});

type JournalEntry = InferSchemaType<typeof journalEntrySchema>;

export default model<JournalEntry>("JournalEntry", journalEntrySchema);
