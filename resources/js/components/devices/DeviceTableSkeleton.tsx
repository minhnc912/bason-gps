export default function DeviceTableSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="animate-pulse space-y-4 p-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="h-10 rounded bg-gray-200" />
                ))}
            </div>
        </div>
    );
}
