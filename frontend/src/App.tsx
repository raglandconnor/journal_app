import { useEffect, useState } from "react";
import { JournalEntryModel } from "./models/journalEntryModel";
import JournalEntry from "./components/JournalEntry";
import CreateJournalEntryModal from "./components/CreateJournalEntryModal";
import * as JournalEntriesAPI from "./api/journalEntriesAPI";
import { TfiPlus } from "react-icons/tfi";
import EditJournalEntryModal from "./components/EditJournalEntryModal";

function App() {
    const [journals, setJournals] = useState<JournalEntryModel[]>([]);
    const [showCreateJournalEntryModal, setShowCreateJournalEntryModal] =
        useState(false);
    const [showEditJournalEntryModal, setShowEditJournalEntryModal] =
        useState(true);
    const [editingId, setEditingId] = useState<string>("");
    const [editingJournalEntry, setEditingJournalEntry] =
        useState<JournalEntryModel | null>(null);

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

    async function deleteJournalEntry(deletedId: string) {
        try {
            await JournalEntriesAPI.deleteJournal(deletedId);
            setJournals(
                journals.filter(
                    (existingJournal) => existingJournal._id !== deletedId
                )
            );
            setEditingId("");
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const onJournalEntryClick = (
        journalEntryId: string,
        journalEntry: JournalEntryModel
    ) => {
        setEditingId(journalEntryId);
        setShowEditJournalEntryModal(true);
        setEditingJournalEntry(journalEntry);
    };

    return (
        <div className="p-6 mt-16">
            {showEditJournalEntryModal && editingId && editingJournalEntry && (
                <EditJournalEntryModal
                    journalEntry={editingJournalEntry}
                    isOpen={showEditJournalEntryModal}
                    setIsOpen={setShowEditJournalEntryModal}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    onSubmitEditedJournalEntry={(editedJournalEntry) => {
                        setJournals(
                            journals.map((prevJournalEntry) => {
                                if (
                                    prevJournalEntry._id ===
                                    editedJournalEntry._id
                                ) {
                                    return editedJournalEntry;
                                } else {
                                    return prevJournalEntry;
                                }
                            })
                        );
                    }}
                    onDeleteJournalEntry={deleteJournalEntry}
                />
            )}
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
                        journalEntryId={journalEntry._id}
                        onClick={onJournalEntryClick}
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
