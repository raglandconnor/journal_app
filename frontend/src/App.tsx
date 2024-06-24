import { useEffect, useState } from "react";
import { JournalEntryModel } from "./models/journalEntryModel";
import JournalEntry from "./components/JournalEntry";
import CreateJournalEntryModal from "./components/CreateJournalEntryModal";
import * as JournalEntriesAPI from "./api/journalEntriesAPI";
import { TfiPlus } from "react-icons/tfi";

function App() {
    const [journals, setJournals] = useState<JournalEntryModel[]>([]);
    const [showCreateJournalEntryModal, setShowCreateJournalEntryModal] =
        useState(false);

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
            {showCreateJournalEntryModal && (
                <CreateJournalEntryModal
                    isOpen={showCreateJournalEntryModal}
                    setIsOpen={setShowCreateJournalEntryModal}
                    onSubmitNewJournalEntry={(newJournalEntry) => {
                        setJournals([...journals, newJournalEntry]);
                    }}
                />
            )}

            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 ">
                {journals.map((journalEntry) => (
                    <JournalEntry
                        journalEntry={journalEntry}
                        key={journalEntry._id}
                    />
                ))}
            </section>

            <button
                onClick={() => setShowCreateJournalEntryModal(true)}
                className="fixed bottom-5 left-1/2 transform -translate-x-1/2 rounded-full bg-red-400 p-4 md:scale-110 cursor-pointer"
            >
                <TfiPlus className="text-white" />
            </button>
        </div>
    );
}

export default App;
