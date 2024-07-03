import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div>
            <h1 className="text-center text-4xl font-extrabold mt-16">
                404 Not Found
            </h1>
            <p className="text-center">
                <Link to="/login" className="underline text-lg text-blue-500">
                    Go to login
                </Link>
            </p>
        </div>
    );
}

export default NotFound;
