import Link from "next/link";
import { getTickets } from "@/features/actions/get-tickets";
import { Ticket } from "@/shared/schema";
import { TicketCard } from "@/features/ticket";

export default async function Home() {
  const tickets: Ticket[] = await getTickets();

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Билеты
      </h1>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </main>
  );
}
