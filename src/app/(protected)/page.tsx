import { getTickets } from "@/features/actions/get-tickets";
import { Ticket } from "@/shared/schema";
import { TicketCard } from "@/features/ticket/ticket";

export default async function Home() {
  const tickets: Ticket[] = await getTickets();

  return (
    <main className="min-h-screen bg-stone-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Билеты
      </h1>
      <div className="space-y-4 max-w-96 mx-auto">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </main>
  );
}
