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
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'arrived', 'notArrived'

  const filteredTickets = tickets.filter((ticket) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearch =
      ticket.name.toLowerCase().includes(lowerSearchTerm) ||
      ticket.email.toLowerCase().includes(lowerSearchTerm) ||
      (ticket.instagram &&
        extractInstagramName(formatInstagramLink(ticket.instagram))
          .toLowerCase()
          .includes(lowerSearchTerm));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "arrived" && ticket.arrived) ||
      (statusFilter === "notArrived" && !ticket.arrived);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        {/* Search Input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-[16px] placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Поиск по имени, email или Instagram"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setSearchTerm("")}
            className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            &times;
          </button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center justify-between space-x-4">
          <span className="text-gray-700 text-sm font-medium">
            Фильтр по статусу:
          </span>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="status"
                value="all"
                checked={statusFilter === "all"}
                onChange={() => setStatusFilter("all")}
                className="form-radio text-blue-600"
              />
              <span className="text-sm text-gray-700">Все</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="status"
                value="arrived"
                checked={statusFilter === "arrived"}
                onChange={() => setStatusFilter("arrived")}
                className="form-radio text-green-600"
              />
              <span className="text-sm text-gray-700">Прибыл</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="status"
                value="notArrived"
                checked={statusFilter === "notArrived"}
                onChange={() => setStatusFilter("notArrived")}
                className="form-radio text-red-600"
              />
              <span className="text-sm text-gray-700">Не прибыл</span>
            </label>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600 w-[40px]">
                #
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Имя
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Статус
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Уровень
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Тип
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Instagram
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, i) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-2 py-3 text-sm text-blue-600 font-medium">
                    <a
                      href={`/ticket/${ticket.id}`}
                      className="hover:underline"
                    >
                      {i + 1}
                    </a>
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-900 font-medium max-w-[180px] truncate">
                    <a
                      href={`/ticket/${ticket.id}`}
                      className="hover:underline"
                    >
                      {ticket.name}
                    </a>
                  </td>
                  <td className="px-2 py-3 text-sm whitespace-nowrap">
                    {ticket.arrived ? (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                        Прибыл
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-full">
                        Не прибыл
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-700">
                    {ticket.grade}
                  </td>
                  <td className="px-2 py-3 text-sm text-center">
                    {ticket.event_id !== "manual" ? (
                      <HandCoins size={18} className="text-green-500" />
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-600">
                    <a
                      href={`mailto:${ticket.email}`}
                      className="hover:underline"
                    >
                      {ticket.email}
                    </a>
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-600 truncate max-w-[150px]">
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
                <td colSpan={7} className="px-4 py-5 text-center text-gray-600">
                  Совпадающие билеты не найдены.
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
