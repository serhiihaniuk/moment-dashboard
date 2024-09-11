import { getTickets } from "@/features/actions/get-tickets";
import { Ticket } from "@/shared/schema";
import TicketModal from "@/shared/add-ticket";
import { extractInstagramName, formatInstagramLink } from "@/shared/util";
import { HandCoins } from "lucide-react";

export default async function Home() {
  const tickets: Ticket[] = await getTickets();

  return (
    <main className="min-h-screen bg-stone-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Билеты
      </h1>

      <div className="space-y-4 max-w-96 mx-auto flex flex-col items-start gap-4 py-4">
        <TicketModal buttonText="+" />
      </div>

      <div className="overflow-x-auto max-w-screen px-2 mx-auto">
        <table className="w-full mx-auto divide-y max-w-[700px] divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                #
              </th>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Имя
              </th>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instagram
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket, i) => (
              <tr key={ticket.id}>
                <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-blue-800 w-1/4">
                  <a href={`/ticket/${ticket.id}`} className="hover:underline">
                    {i + 1}
                  </a>
                </td>
                <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-blue-800">
                  <a
                    href={`/ticket/${ticket.id}`}
                    className="hover:underline flex gap-2"
                  >
                    {ticket.name} - {ticket.grade}
                    {ticket.event_id !== "manual" && (
                      <HandCoins size={14} color="green" />
                    )}
                  </a>
                </td>
                <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-700">
                  {ticket.arrived ? (
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
                      Прибыл
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded">
                      Не прибыл
                    </span>
                  )}
                </td>
                <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-600">
                  <a
                    href={`mailto:${ticket.email}`}
                    className="hover:underline"
                  >
                    {ticket.email}
                  </a>
                </td>
                <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-600">
                  {ticket.instagram && (
                    <a
                      href={formatInstagramLink(ticket.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {extractInstagramName(
                        formatInstagramLink(ticket.instagram)
                      )}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
