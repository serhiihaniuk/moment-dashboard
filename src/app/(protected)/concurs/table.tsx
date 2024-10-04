"use client";
import React, { useState } from "react";
import { ConcursRegistration } from "@/shared/schema";
import Link from "next/link";

function normalizeCategory(category: string) {
  return category === "1" ? "Найрівніший френч" : "Корейські дизайни";
}

export function RegistrationTable({
  registrations,
}: {
  registrations: ConcursRegistration[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRegistrations = registrations.filter((reg) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      reg.first_name.toLowerCase().includes(lowerSearchTerm) ||
      reg.last_name.toLowerCase().includes(lowerSearchTerm) ||
      reg.phone.includes(lowerSearchTerm) ||
      reg.email.toLowerCase().includes(lowerSearchTerm) ||
      reg.instagram.toLowerCase().includes(lowerSearchTerm) ||
      normalizeCategory(reg.category).toLowerCase().includes(lowerSearchTerm)
    );
  });

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* Search Input */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-[16px] placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Поиск по имени, телефону, email или Instagram"
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                #
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Имя
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Телефон
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Instagram
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Категория
              </th>
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">
                Дата регистрации
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((reg, i) => (
                <tr
                  key={reg.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-2 py-3 text-sm text-blue-600 font-medium">
                    {i + 1}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-900 font-medium max-w-[180px] truncate">
                    {reg.first_name} {reg.last_name}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-600">
                    {reg.phone}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-600">
                    <a href={`mailto:${reg.email}`} className="hover:underline">
                      {reg.email}
                    </a>
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-600">
                    {reg.instagram && (
                      <Link
                        href={`https://instagram.com/${reg.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {reg.instagram}
                      </Link>
                    )}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-700">
                    {normalizeCategory(reg.category)}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-600">
                    {new Date(reg.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-5 text-center text-gray-600">
                  Совпадающие регистрации не найдены.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
