import { useEffect, useState } from "react";
import JournalsPage from "./JournalsPage";
import Navbar from "./Navbar";
import { UserModel } from "../models/userModel";
import * as UserAPI from "../api/userAPI";
import { useNavigate } from "react-router-dom";

function JournalsRoot() {
    const [user, setUser] = useState<UserModel | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const fetchedUser = await UserAPI.getLoggedInUser();

                setUser(fetchedUser);
            } catch (error) {
                console.error(error);
                navigate("/login");
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
