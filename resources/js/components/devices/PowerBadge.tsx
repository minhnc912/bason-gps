interface Props {
    power?: boolean;
}

export default function PowerBadge({ power }: Props) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
                power
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
            }`}
        >
            {power ? "AC" : "DC"}
        </span>
    );
}
