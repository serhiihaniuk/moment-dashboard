import React from "react";
import { ConcursRegistration } from "@/shared/schema";
import { getConcursRegistrations } from "@/app/api/concurs/get-concurs-registrations";

function RegistrationList({
  registrations,
}: {
  registrations: ConcursRegistration[];
}) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
        {registrations.length
          ? "Участники"
          : "Здесь будет отображаться список участников"}
      </h2>
      <ul className="space-y-4">
        {registrations.map((reg) => (
          <li key={reg.id} className="bg-white shadow rounded-lg p-4">
            <p>
              <strong>Ім&apos;я:</strong> {reg.first_name} {reg.last_name}
            </p>
            <p>
              <strong>Категорія:</strong>{" "}
              {reg.category === "1" ? "Найрівніший френч" : "Корейські дизайни"}
            </p>
            <p>
              <strong>Instagram:</strong> {reg.instagram}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ConcursRegistrationPage() {
  const registrations = await getConcursRegistrations();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Регистрация на конкурс
      </h1>
      <RegistrationList registrations={registrations} />
    </div>
  );
}
