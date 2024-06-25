import { useState } from "react";
import { LoginCredentials } from "../api/userAPI";
import { Link, useNavigate } from "react-router-dom";
import * as UserAPI from "../api/userAPI";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const onLoginSuccessful = (): void => {
        navigate("/journals");
    };

    async function onSubmit() {
        const credentials: LoginCredentials = {
            username,
            password,
        };

        try {
            setIsSubmitting(true);
            const userLoggingIn = await UserAPI.logIn(credentials);
            onLoginSuccessful();
        } catch (error) {
            console.log(error);
            alert(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <section className="grid px-8 py-12 shadow-lg">
                <h1 className="text-2xl font-semibold">Log In</h1>
                <p className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 underline">
                        Sign up
                    </Link>
                </p>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleChange}
                    className="mt-2 p-1 block border rounded pl-2"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleChange}
                    className="mt-2 p-1 block border rounded pl-2"
                />
                <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="mt-8 bg-blue-500 px-3 py-[4px] rounded hover:bg-blue-600"
                >
                    Log In
                </button>
            </section>
        </div>
    );
}

export default LoginPage;
