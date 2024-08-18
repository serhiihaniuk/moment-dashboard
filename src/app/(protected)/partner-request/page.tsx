import { getPartnerRequests } from "@/app/api/partner-request/get-partner-requests";
import { PartnerRequest } from "@/shared/schema";
import Link from "next/link";

// PartnerRequestCard component
function PartnerRequestCard({ request }: { request: PartnerRequest }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        {request.brand_name}
      </h2>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-medium">Имя:</span> {request.full_name}
        </p>
        <p className="text-gray-600">
          <Link
            href={`mailto:${request.email}`}
            className="text-blue-600 hover:underline"
          >
            <span className="font-medium">Email:</span> {request.email}
          </Link>
        </p>
        <p className="text-gray-600">
          <Link
            href={`tel:${request.phone}`}
            className="text-blue-600 hover:underline"
          >
            <span className="font-medium">Телефон:</span> {request.phone}
          </Link>
        </p>
      </div>
    </div>
  );
}

// Main page component
export default async function PartnerRequests() {
  const partnerRequests = await getPartnerRequests();

  return (
    <main className="min-h-screen bg-stone-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Запросы на партнерство
      </h1>
      <div className="space-y-4 max-w-96 mx-auto">
        {partnerRequests.map((request) => (
          <PartnerRequestCard key={request.id} request={request} />
        ))}
      </div>
    </main>
  );
}
