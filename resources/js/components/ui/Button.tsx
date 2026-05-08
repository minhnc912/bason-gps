export function Button({ className = "", loading, children, ...props }: any) {
    return (
        <button
            {...props}
            disabled={props.disabled || loading}
            className={`w-full rounded-lg px-4 py-2 font-medium transition
                bg-blue-600 text-white
                hover:bg-blue-700
                cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}`}
        >
            {loading ? "Đang đăng nhập..." : children}
        </button>
    );
}
