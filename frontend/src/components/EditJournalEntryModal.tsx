import { useState } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { JournalEntryModel } from "../models/journalEntryModel";
import { JournalEntryInput } from "../api/journalEntriesAPI";
import * as JournalEntriesAPI from "../api/journalEntriesAPI";

interface editJournalEntryModalProps {
    journalEntry: JournalEntryModel;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editingId: string;
    setEditingId: React.Dispatch<React.SetStateAction<string>>;
    onSubmitEditedJournalEntry: (journalEntry: JournalEntryModel) => void;
    onDeleteJournalEntry: (deletedJournalEntryId: string) => void;
}

function EditJournalEntryModal({
    journalEntry,
    isOpen,
    setIsOpen,
    editingId,
    setEditingId,
    onSubmitEditedJournalEntry,
    onDeleteJournalEntry,
}: editJournalEntryModalProps) {
    const [newTitle, setNewTitle] = useState(journalEntry.title);
    const [newText, setNewText] = useState(journalEntry.text);

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, name } = e.target;

        if (name === "title") {
            setNewTitle(value);
        } else if (name === "text") {
            setNewText(value);
        }
    };

    const handleSubmit = async () => {
        try {
            const editedJournalEntryInput: JournalEntryInput = {
                title: newTitle,
                text: newText,
            };
            const journalRes = await JournalEntriesAPI.updateJournalEntry(
                editingId,
                editedJournalEntryInput
            );
            onSubmitEditedJournalEntry(journalRes);
            setEditingId("");
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        <Dialog className="relative z-10" open={isOpen} onClose={setIsOpen}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-md sm:max-w-lg"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <DialogTitle
                                        as="h3"
                                        className="w-full text-xl"
                                    >
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Title"
                                            value={newTitle}
                                            className="border rounded-md w-full pl-2"
                                            onChange={handleFormChange}
                                        />
                                    </DialogTitle>
                                    <div className="w-full mt-2">
                                        <textarea
                                            id="text"
                                            name="text"
                                            placeholder="Start writing..."
                                            value={newText}
                                            className="w-full block border rounded-md h-48 md:h-96 pl-2"
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                                onClick={handleSubmit}
                            >
                                Confirm Changes
                            </button>
                            <button
                                type="button"
                                className="mt-3 md:mt-0 inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                onClick={() => onDeleteJournalEntry(editingId)}
                            >
                                Delete Note
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => {
                                    setIsOpen(false);
                                    setEditingId("");
                                }}
                                data-autofocus
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export default EditJournalEntryModal;
