import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 bg-gray-50 p-4 flex flex-col relative">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
