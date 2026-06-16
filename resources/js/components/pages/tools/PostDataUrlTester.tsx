import { useState } from "react";

interface Props {
    loading: boolean;

    onSubmit: (url: string) => void;
}

export default function PostDataUrlTester({
    loading,
    onSubmit,
}: Props) {
    const [url, setUrl] = useState("");

    return (
        <div className="space-y-4">
            <textarea
                rows={5}
                value={url}
                onChange={(e) =>
                    setUrl(e.target.value)
                }
                className="w-full rounded border p-3"
                placeholder="Paste wget URL here..."
            />

            <button
                disabled={loading}
                onClick={() => onSubmit(url)}
                className="rounded bg-blue-600 px-4 py-2 text-white"
            >
                Execute
            </button>
        </div>
    );
}
