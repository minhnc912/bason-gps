interface Props {
    headers: string[];

    children: React.ReactNode;
}

export default function DataTable({ headers, children }: Props) {
    return (
        <div className="overflow-x-auto rounded-lg border bg-white">
            <table className="min-w-full text-sm">
                <thead className="bg-[#4CAF50] ">
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header}
                                className="px-4 py-3 text-left text-white text-smfont-semibold "
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>{children}</tbody>
            </table>
        </div>
    );
}
