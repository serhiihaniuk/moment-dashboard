import { getConcursRegistrations } from "@/app/api/concurs/get-concurs-registrations";
import { RegistrationTable } from "./table";

export default async function ConcursRegistrationPage() {
  const registrations = await getConcursRegistrations();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Регистрация на конкурс
      </h1>
      <RegistrationTable registrations={registrations} />
    </div>
  );
}
