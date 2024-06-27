import { useEffect, useState } from "react";
import { TfiPlus } from "react-icons/tfi";
import { ThreeDots } from "react-loader-spinner";
import * as JournalEntriesAPI from "../api/journalEntriesAPI";
import CreateJournalEntryModal from "../components/CreateJournalEntryModal";
import EditJournalEntryModal from "../components/EditJournalEntryModal";
import JournalEntry from "../components/JournalEntry";
import { JournalEntryModel } from "../models/journalEntryModel";

function JournalsPage() {
    const [journals, setJournals] = useState<JournalEntryModel[]>([]);
    const [showCreateJournalEntryModal, setShowCreateJournalEntryModal] =
        useState(false);
    const [showEditJournalEntryModal, setShowEditJournalEntryModal] =
        useState(true);
    const [editingId, setEditingId] = useState<string>("");
    const [editingJournalEntry, setEditingJournalEntry] =
        useState<JournalEntryModel | null>(null);
    const [loadingJournal, setLoadingJournal] = useState(false);
    const [loadingJournalsError, setLoadingJournalsError] = useState(false);

    const sortJournalsByTime = (): void => {
        setJournals((prevJournals) => {
            return prevJournals.sort((a, b) => {
                const dateB = new Date(b.createdAt).getTime();
                const dateA = new Date(a.createdAt).getTime();
                return dateB - dateA;
            });
        });
    };

    useEffect(() => {
        async function loadJournals() {
            try {
                setLoadingJournalsError(false);
                setLoadingJournal(true);

                const journalsData = await JournalEntriesAPI.fetchJournals();

                setJournals(journalsData);

                sortJournalsByTime();
            } catch (error) {
                console.error("Error fetching journals:", error);
                setLoadingJournalsError(true);
            } finally {
                setLoadingJournal(false);
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

    const journalsElements = (
        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
            {journals.map((journalEntry) => (
                <JournalEntry
                    journalEntry={journalEntry}
                    key={journalEntry._id}
                    journalEntryId={journalEntry._id}
                    onClick={onJournalEntryClick}
                />
            ))}
        </section>
    );

    return (
        <div className="p-6 mt-16 md:mt-20">
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
                        setLoadingJournal(true);
                        setJournals([...journals, newJournalEntry]);
                        sortJournalsByTime();
                        setLoadingJournal(false);
                    }}
                />
            )}

            {loadingJournal && (
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    radius="9"
                    color="gray"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="w-full flex items-center justify-center"
                />
            )}
            {loadingJournalsError && (
                <p className="text-center">
                    Something went wrong. Please refresh the page
                </p>
            )}
            {!loadingJournal && !loadingJournalsError && (
                <>
                    {journals.length > 0 ? (
                        journalsElements
                    ) : (
                        <p className="text-center text-gray-500">
                            Start writing...
                        </p>
                    )}
                </>
            )}

            <button
                onClick={() => setShowCreateJournalEntryModal(true)}
                className="fixed bottom-5 left-1/2 transform -translate-x-1/2 rounded-full bg-red-400 p-4 md:scale-110 cursor-pointer"
            >
                <TfiPlus className="text-white scale-105" />
            </button>
        </div>
    );
}

export default JournalsPage;
