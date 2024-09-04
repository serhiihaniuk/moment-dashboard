"use server";
import { db } from "@/shared/db";
import { ticketTable } from "@/shared/schema"; // Import the schema for the ticket table
import { eq, asc } from "drizzle-orm"; // Import the necessary functions from Drizzle

// Function to get non-archived tickets
export const getTickets = async () => {
  const tickets = await db
    .select()
    .from(ticketTable)
    .where(eq(ticketTable.archived, false))
    .orderBy(asc(ticketTable.date));
  return tickets;
};

// Function to set the archived field to true
export const archiveTicket = async (ticketId: string) => {
  await db
    .update(ticketTable)
    .set({ archived: true })
    .where(eq(ticketTable.id, ticketId));
};
