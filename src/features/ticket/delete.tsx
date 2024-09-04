"use client";
import { archiveTicket } from "./actions";

// Mark this component as a client component

export function DeleteTicketButton({ ticketId }: { ticketId: string }) {
  // Function to handle delete with confirmation
  const handleDelete = async () => {
    if (confirm("Вы уверены, что хотите удалить этот билет?")) {
      const formData = new FormData();
      formData.append("ticketId", ticketId);
      await archiveTicket(formData);
      window.location.href = "/"; // Redirect after deletion
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Удалить билет
    </button>
  );
}
