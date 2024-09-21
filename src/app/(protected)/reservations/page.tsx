import React from "react";
import { Reservation } from "@/shared/schema";
import Link from "next/link";
import { getReservations } from "@/app/api/reservations/get-reservations";

function RegistrationList({ registrations }: { registrations: Reservation[] }) {
  return (
    <div className="space-y-4 max-w-96 mx-auto">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
        {registrations.length
          ? "Резервація"
          : "Здесь будет отображатися список резерваций"}
      </h2>
      <ul className="space-y-4">
        {registrations.map((reg) => (
          <li key={reg.id} className="bg-white shadow rounded-lg p-4">
            <p>
              <strong>Ім&apos;я:</strong> {reg.name}
            </p>
            <p>
              <strong>Instagram:</strong>{" "}
              <Link
                href={`https://instagram.com/${reg.instagram}`}
                target="_blank"
              >
                {reg.instagram}
              </Link>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <Link href={`mailto:${reg.email}`} className="hover:underline">
                {reg.email}
              </Link>
            </p>
            <p>
              <strong>Телефон:</strong>{" "}
              <Link href={`tel:${reg.phone}`} className="hover:underline">
                {reg.phone}
              </Link>
            </p>
            <p>
              <strong>Telegram:</strong>{" "}
              <Link href={`https://t.me/${reg.telegram}`} target="_blank">
                {reg.telegram}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ConcursRegistrationPage() {
  const registrations = await getReservations();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Резервація
      </h1>
      <RegistrationList registrations={registrations} />
    </div>
  );
}
