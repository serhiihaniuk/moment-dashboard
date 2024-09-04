"use server";

import { db } from "@/shared/db";
import { ticketTable } from "@/shared/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleTicketPresence(formData: FormData) {
  const ticketId = formData.get("ticketId") as string;

  if (!ticketId) {
    throw new Error("Ticket ID is required");
  }

  try {
    // Fetch the current ticket
    const [currentTicket] = await db
      .select()
      .from(ticketTable)
      .where(eq(ticketTable.id, ticketId))
      .limit(1);

    if (!currentTicket) {
      throw new Error("Билет не найден");
    }

    const updatedTicket = await db
      .update(ticketTable)
      .set({ arrived: !currentTicket.arrived })
      .where(eq(ticketTable.id, ticketId))
      .returning();

    revalidatePath(`/ticket/${ticketId}`);
    revalidatePath("/");

    return updatedTicket[0];
  } catch (error) {
    console.error("Ошибка при обновлении статуса прибытия:", error);
    throw new Error("Не удалось обновить статус прибытия");
  }
}

// Function to archive (delete) a ticket
export async function archiveTicket(formData: FormData) {
  const ticketId = formData.get("ticketId") as string;

  if (!ticketId) {
    throw new Error("Ticket ID is required");
  }

  try {
    const archivedTicket = await db
      .update(ticketTable)
      .set({ archived: true }) // Set the archived field to true
      .where(eq(ticketTable.id, ticketId))
      .returning();

    revalidatePath("/");
    revalidatePath(`/ticket/${ticketId}`);

    return archivedTicket[0];
  } catch (error) {
    console.error("Ошибка при архивировании билета:", error);
    throw new Error("Не удалось архивировать билет");
  }
}
