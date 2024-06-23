import { useEffect, useState } from "react";
import { JournalEntryModel } from "./models/journalEntryModel";
import JournalEntry from "./components/JournalEntry";
import * as JournalEntriesAPI from "./api/journalEntriesAPI";

function App() {
    const [journals, setJournals] = useState<JournalEntryModel[]>([]);

    useEffect(() => {
        async function loadJournals() {
            try {
                const journalsData = await JournalEntriesAPI.fetchJournals();

                setJournals(journalsData);
            } catch (error) {
                console.error("Error fetching journals:", error);
                alert(error);
            }
        }

        loadJournals();
    }, []);

    return (
        <div className="p-6 mt-16">
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 ">
                {journals.map((journalEntry) => (
                    <JournalEntry
                        journalEntry={journalEntry}
                        key={journalEntry._id}
                    />
                ))}
            </section>
        </div>
    );
}

export default App;
