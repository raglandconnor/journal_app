import { useEffect, useState } from "react";
import JournalsPage from "./JournalsPage";
import Navbar from "./Navbar";
import { UserModel } from "../models/userModel";
import * as UserAPI from "../api/userAPI";

function JournalsRoot() {
    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const fetchedUser = await UserAPI.getLoggedInUser();
                setUser(fetchedUser);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUser();
    }, []);

    return (
        <div>
            <Navbar user={user} />
            <JournalsPage />
        </div>
    );
}

export default JournalsRoot;
