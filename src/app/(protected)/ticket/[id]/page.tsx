import { getTickets } from "@/features/actions/get-tickets";
import { TicketCard } from "@/features/ticket";
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
