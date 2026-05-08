interface Props {
    latitude?: number | null;

    longitude?: number | null;
}

export default function CoordinateCell({ latitude, longitude }: Props) {
    if (!latitude || !longitude) {
        return "-";
    }

    return (
        <a
            href={`https://maps.google.com/?q=${latitude},${longitude}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
        >
            {latitude}, {longitude}
        </a>
    );
}
