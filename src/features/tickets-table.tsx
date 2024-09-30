"use client"; // to enable client-side functionality

import { useState } from "react";
import { Ticket } from "@/shared/schema";
import { extractInstagramName, formatInstagramLink } from "@/shared/util";
import { HandCoins } from "lucide-react";

interface TicketsTableProps {
  tickets: Ticket[];
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      ticket.name.toLowerCase().includes(lowerSearchTerm) ||
      ticket.email.toLowerCase().includes(lowerSearchTerm) ||
      (ticket.instagram &&
        extractInstagramName(formatInstagramLink(ticket.instagram))
          .toLowerCase()
          .includes(lowerSearchTerm))
    );
  });

  return (
    <div className="max-w-screen px-2 mx-auto">
      {/* Search Input */}
      <div className="mb-4 mx-auto w-full max-w-96 flex gap-2">
        <input
          type="text"
          className="p-2 border border-gray-300 grow text-[18px] placeholder:text-[14px] rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Поиск по имени, email или Instagram"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setSearchTerm("")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          &times;
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
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
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, i) => (
                <tr key={ticket.id}>
                  <td className="px-1 max-w-52 overflow-hidden text-ellipsis py-4 whitespace-nowrap text-sm font-medium text-blue-800 w-1/4">
                    <a
                      href={`/ticket/${ticket.id}`}
                      className="hover:underline"
                    >
                      {i + 1}
                    </a>
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap text-sm max-w-52 overflow-hidden text-ellipsis font-medium text-blue-800">
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
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-1 py-4 text-center text-sm text-gray-600"
                >
                  No matching tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsTable;
