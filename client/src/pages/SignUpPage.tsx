import { useState, useRef, useEffect } from "react";
import { SignUpCredentials } from "../api/userAPI";
import * as UserAPI from "../api/userAPI";
import { Link, useNavigate } from "react-router-dom";
import { ConflictErr, MissingParamsErr } from "../errors/http_errors";

function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errText, setErrText] = useState<String | null>(null);

    const navigate = useNavigate();
    const signUpSuccessful = (): void => {
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

        const credentials: SignUpCredentials = {
            username,
            email,
            password,
        };

        try {
            setIsSubmitting(true);
            const newUser = await UserAPI.signUp(credentials);

            if (newUser) {
                signUpSuccessful();
            }
        } catch (error) {
            if (
                error instanceof ConflictErr ||
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
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen px-6">
            <section className="grid px-8 py-12 shadow-lg w-full md:w-[400px]">
                <h1 className="text-2xl font-semibold">Sign Up</h1>
                <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 underline">
                        Log in
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
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={handleChange}
                        className="mt-2 p-1 block border rounded pl-2 w-full"
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
                        Sign Up
                    </button>
                </form>
            </section>
        </div>
    );
}

export default SignUpPage;
