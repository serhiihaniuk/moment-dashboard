import { getTickets } from "@/features/actions/get-tickets";
import { Ticket } from "@/shared/schema";
import TicketModal from "@/shared/add-ticket";
import TicketsTable from "@/features/tickets-table";

export default async function Home() {
  const tickets: Ticket[] = await getTickets();

  return (
    <main className="min-h-screen bg-stone-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Билеты
      </h1>

      <div className="space-y-4 max-w-96 mx-auto flex flex-col items-start gap-4 py-4">
        <TicketModal buttonText="Добавить билет" />
      </div>
      <TicketsTable tickets={tickets} />
    </main>
  );
}
