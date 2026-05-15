import { Ticket } from "@/types/tickets";
import CoordinateCell from "../devices/CoordinateCell";
import AddressLink from "../devices/AddressLink";

interface Props {
    tickets: Ticket[];
}

export default function TicketTable({ tickets }: Props) {
    return (
        <>
            {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                    <td className="p-1 font-medium">{ticket.unit_id}</td>

                    <td className="p-1">
                        {new Date(ticket.created_at).toLocaleString()}
                    </td>

                    <td className="p-1">{ticket.truck_number || "-"}</td>

                    <td className="max-w-xs truncate p-1">
                        {ticket.meter_number || "-"}
                    </td>

                    <td className="p-1">
                        <CoordinateCell
                            latitude={ticket.latitude}
                            longitude={ticket.longitude}
                        />
                    </td>

                    <td className="p-1">{ticket.address || "-"}</td>
                    <td className="p-1">
                        <AddressLink address={ticket.address} />
                    </td>
                    <td className="p-1">{ticket.action}</td>
                </tr>
            ))}
        </>
    );
}
