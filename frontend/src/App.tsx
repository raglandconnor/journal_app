import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import JournalsRoot from "./pages/JournalsRoot";
import SignUpPage from "./pages/SignUpPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/signup" replace />,
        errorElement: <NotFound />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
        errorElement: <NotFound />,
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <NotFound />,
    },
    {
        path: "/journals",
        element: <JournalsRoot />,
        errorElement: <NotFound />,
    },
]);

function App() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
