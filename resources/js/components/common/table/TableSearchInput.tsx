interface Props {
    value: string;

    onChange: (value: string) => void;

    placeholder?: string;
}

export default function TableSearchInput({
    value,
    onChange,
    placeholder = "Search...",
}: Props) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg border px-4 py-2"
        />
    );
}
