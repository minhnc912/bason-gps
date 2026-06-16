interface Props {
    response: unknown;
}

export default function PostDataResponse({
    response,
}: Props) {
    if (!response) {
        return null;
    }

    return (
        <div className="rounded-xl border bg-white p-4">
            <h3 className="mb-3 font-semibold">
                Response
            </h3>

            <pre className="overflow-auto text-sm">
                {JSON.stringify(
                    response,
                    null,
                    2
                )}
            </pre>
        </div>
    );
}
