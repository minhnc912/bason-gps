interface Props {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function DeviceFilters({ search, onSearchChange }: Props) {
    return (
        <div className="flex gap-4">
            <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search unit id or serial..."
                className="w-full rounded-lg border p-2"
            />
        </div>
    );
}
