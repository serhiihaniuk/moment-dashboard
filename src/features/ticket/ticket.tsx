import { Ticket } from "@/shared/schema";
import Link from "next/link";
import { toggleTicketPresence } from "./actions"; // Import the required actions
import { DeleteTicketButton } from "./delete"; // Import the DeleteTicketButton
import { extractInstagramName, formatInstagramLink } from "@/shared/util";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      {/* Ticket Header */}
      <Link href={`/ticket/${ticket.id}`} className="block mb-4">
        <h2 className="text-2xl font-semibold flex items-center justify-between">
          <span className="text-blue-800">{ticket.name}</span>
          <span className="text-emerald-900 font-bold">{ticket.grade}</span>
        </h2>
      </Link>

      {/* Ticket Info */}
      <div className="space-y-2 mb-4">
        {/* Email Link */}
        <Link
          className="flex items-center text-gray-600 hover:text-blue-600"
          href={`mailto:${ticket.email}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          {ticket.email}
        </Link>

        {/* Phone Link */}
        <Link
          className="flex items-center text-gray-600 hover:text-blue-600"
          href={`tel:${ticket.phone}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {ticket.phone}
        </Link>

        {/* Instagram Link */}
        {ticket.instagram && (
          <Link
            className="flex items-center text-gray-600 hover:text-blue-600"
            target="_blank"
            href={formatInstagramLink(ticket.instagram)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            {extractInstagramName(formatInstagramLink(ticket.instagram))}
          </Link>
        )}
      </div>

      {/* Ticket Status */}
      <div className="mb-4">
        <span className="block text-gray-700">Статус прибытия:</span>
        <span
          className={`inline-block px-2 py-1 text-sm font-medium rounded ${
            ticket.arrived
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {ticket.arrived ? "Прибыл" : "Не прибыл"}
        </span>
      </div>

      {/* Form to toggle ticket presence */}
      <form action={toggleTicketPresence} className="mb-4">
        <input type="hidden" name="ticketId" value={ticket.id} />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          {ticket.arrived
            ? "Отметить как не прибывшего"
            : "Отметить как прибывшего"}
        </button>
      </form>

      {/* Delete Button */}
      <DeleteTicketButton ticketId={ticket.id} />
    </div>
  );
}
