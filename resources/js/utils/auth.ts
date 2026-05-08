export function getToken(): string | null {
    const token = localStorage.getItem("auth_token");

    if (!token || token === "undefined" || token === "null") {
        return null;
    }

    return token;
}
