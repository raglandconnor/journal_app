import { UserModel } from "../models/userModel";
import fetchData from "../utils/fetchData";

export async function getLoggedInUser(): Promise<UserModel> {
    const res = await fetchData("/api/users", { method: "GET" });

    return res.json();
}

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export async function signUp(
    credentials: SignUpCredentials
): Promise<UserModel> {
    const res = await fetchData("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    return res.json();
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export async function logIn(credentials: LoginCredentials): Promise<UserModel> {
    const res = await fetchData("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    return res.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}
