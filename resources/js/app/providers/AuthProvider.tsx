import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "@/services/auth.service";
import { getToken } from "@/utils/auth";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    useEffect(() => {
        const init = async () => {
            const token = getToken();

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await getMe();

                setUser(res.data);
            } catch {
                localStorage.removeItem("auth_token");
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("AuthContext missing");
    return ctx;
};
