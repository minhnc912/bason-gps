type Props = {
    label: string;
    error?: string;
    children: React.ReactNode;
};

export function FormField({ label, error, children }: Props) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>

            {children}

            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
