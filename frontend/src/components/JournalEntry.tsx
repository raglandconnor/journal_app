import { JournalEntryModel } from "../models/journalEntryModel";
import { formatDate } from "../utils/formatDate";

interface JournalEntryProps {
    onClick: (journalEntryId: string, journalEntry: JournalEntryModel) => void;
    journalEntry: JournalEntryModel;
    journalEntryId: string;
}

function JournalEntry({
    journalEntry,
    onClick,
    journalEntryId,
}: JournalEntryProps) {
    const { title, text, updatedAt, createdAt } = journalEntry;

    let dateString;
    if (!createdAt || !updatedAt) {
        dateString = "";
    } else if (updatedAt > createdAt) {
        dateString = `${formatDate(createdAt)} (updated ${formatDate(
            updatedAt
        )})`;
    } else {
        dateString = formatDate(createdAt);
    }

    return (
        <div className="border-gray-200 whitespace-pre-line">
            <a
                href="#"
                onClick={() => onClick(journalEntryId, journalEntry)}
                className="h-full md:max-h-72 lg:max-h-96 flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <p
                    className="flex-grow font-normal text-gray-700 dark:text-gray-400 overflow-hidden mask"
                    style={{
                        maskImage:
                            "linear-gradient(180deg, #000000 80%, transparent 100%)",
                    }}
                >
                    {text}
                </p>
                <div className="mt-3 border-t pt-1">
                    <p className="font-xs text-gray-700 dark:text-gray-400">
                        {dateString}
                    </p>
                </div>
            </a>
        </div>
    );
}

export default JournalEntry;
