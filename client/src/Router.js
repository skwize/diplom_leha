import { createBrowserRouter } from "react-router-dom";
import Root, { loader } from "./Root"
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: loader
    },
    {
        path: "/signin",
        element: <SignIn />
    }
]);

export default router;