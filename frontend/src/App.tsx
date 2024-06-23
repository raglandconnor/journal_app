import { useEffect, useState } from "react";
import { JournalEntry } from "./models/journalEntry";

function App() {
    const [journals, setJournals] = useState<JournalEntry[]>([]);

    useEffect(() => {
        async function loadJournals() {
            try {
                const res = await fetch("/api/journals", {
                    method: "GET",
                });

                const journalsData = await res.json();
                setJournals(journalsData);
            } catch (error) {
                console.error("Error fetching journals:", error);
                alert(error);
            }
        }

        loadJournals();
    }, []);

    return <p>{JSON.stringify(journals)}</p>;
}

export default App;
