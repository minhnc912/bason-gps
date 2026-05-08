interface Props {
    address?: string | null;
}

export default function AddressLink({ address }: Props) {
    if (!address) {
        return "-";
    }

    return (
        <a
            href={`https://www.google.com/maps/search/?api=1&query=${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
        >
            {address}
        </a>
    );
}
