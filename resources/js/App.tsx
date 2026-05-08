import AppRouter from "@/app/router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/providers/AuthProvider";

export default function App() {
    return (
        <AuthProvider>
            <AppRouter />;
            <Toaster position="top-right" />
        </AuthProvider>
    );
}
