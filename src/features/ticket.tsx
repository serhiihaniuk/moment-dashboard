import { Ticket } from "@/shared/schema";
import Link from "next/link";
import { toggleTicketPresence } from "./ticket/actions";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="bg-red-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 w-full max-w-md mx-auto">
      <Link href={`/ticket/${ticket.id}`} className="block mb-2">
        <h2 className="text-lg font-semibold text-blue-600 hover:text-red-800 transition-colors duration-300 truncate">
          {ticket.name}
        </h2>
      </Link>
      <div className="grid grid-cols-1 gap-2 text-sm">
        <p className="flex items-center text-gray-600 truncate">
          <span className="font-medium mr-2">Email:</span> {ticket.email}
        </p>
        <p className="flex items-center text-gray-600 truncate">
          <span className="font-medium mr-2">Телефон:</span> {ticket.phone}
        </p>
        {ticket.instagram && (
          <p className="flex items-center text-gray-600 truncate">
            <span className="font-medium mr-2">Instagram:</span>{" "}
            {ticket.instagram}
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center">
        <span className="mr-2 text-sm text-gray-600">Статус прибытия:</span>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
            ticket.arrived
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {ticket.arrived ? "Прибыл" : "Не прибыл"}
        </span>
      </div>
      <form action={toggleTicketPresence} className="mt-4">
        <input type="hidden" name="ticketId" value={ticket.id} />
        <button
          type="submit"
          className="w-full text-sm text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition-colors duration-300"
        >
          {ticket.arrived
            ? "Отметить как не прибывшего"
            : "Отметить как прибывшего"}
        </button>
      </form>
    </div>
  );
}
