import { useState, useRef, useEffect } from "react";
import { LoginCredentials } from "../api/userAPI";
import { Link, useNavigate } from "react-router-dom";
import * as UserAPI from "../api/userAPI";
import { MissingParamsErr, UnauthorizedErr } from "../errors/http_errors";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errText, setErrText] = useState<String | null>(null);

    const navigate = useNavigate();
    const onLoginSuccessful = (): void => {
        navigate("/journals");
    };
    const usernameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (usernameInputRef.current) {
            usernameInputRef.current.focus();
        }
    }, []);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const credentials: LoginCredentials = {
            username,
            password,
        };

        try {
            setIsSubmitting(true);
            const userLoggingIn = await UserAPI.logIn(credentials);
            onLoginSuccessful();
        } catch (error) {
            if (
                error instanceof UnauthorizedErr ||
                error instanceof MissingParamsErr
            ) {
                setErrText(error.message);
            } else {
                console.log(error);
                alert(error);
            }
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
        <div className="flex items-center justify-center h-screen px-6">
            <section className="grid px-8 py-12 shadow-lg w-full md:w-[400px]">
                <h1 className="text-2xl font-semibold">Log In</h1>
                <p className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 underline">
                        Sign up
                    </Link>
                </p>
                <form onSubmit={onSubmit} className="w-full">
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                        className="mt-2 p-1 block border rounded pl-2 w-full"
                        ref={usernameInputRef}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                        className="mt-2 p-1 block border rounded pl-2 w-full"
                        required
                    />

                    {errText && (
                        <p className="text-red-500 text-[0.9rem]">{errText}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-8 bg-blue-500 px-3 py-[4px] rounded hover:bg-blue-600 w-full"
                    >
                        Log In
                    </button>
                </form>
            </section>
        </div>
    );
}

export default LoginPage;
