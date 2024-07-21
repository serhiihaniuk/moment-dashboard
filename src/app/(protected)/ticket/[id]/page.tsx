import { getTickets } from "@/features/actions/get-tickets";
import { toggleTicketPresence } from "@/features/ticket/actions";
import { Ticket } from "@/shared/schema";
import Link from "next/link";

const getTicketById = async (id: string) => {
  const tickets = await getTickets();
  return tickets.find((ticket) => ticket.id === id);
};

export default async function TicketPage({
  params,
}: {
  params: { id: string };
}) {
  const ticket = await getTicketById(params.id);

  if (!ticket) {
    return <div className="text-center mt-10">Билет не найден</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Назад к списку билетов
        </Link>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Информация о билете
        </h1>
        <TicketCard ticket={ticket} />
      </div>
    </main>
  );
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <Link href={`/ticket/${ticket.id}`} className="block mb-2">
        <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300">
          {ticket.name}
        </h2>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <p className="flex items-center text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          {ticket.email}
        </p>
        <p className="flex items-center text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {ticket.phone}
        </p>
        {ticket.instagram && (
          <p className="flex items-center text-gray-600 col-span-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            {ticket.instagram}
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center">
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
      <form action={toggleTicketPresence} className="mt-2">
        <input type="hidden" name="ticketId" value={ticket.id} />
        <button
          type="submit"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {ticket.arrived
            ? "Отметить как не прибывшего"
            : "Отметить как прибывшего"}
        </button>
      </form>
    </div>
  );
}
