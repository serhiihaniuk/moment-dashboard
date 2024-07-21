"use server";
import { db } from "@/shared/db";

export const getTickets = async () => {
  const tickets = await db.query.ticketTable.findMany({
    orderBy: (tickets, { asc }) => [asc(tickets.date)],
  });
  return tickets;
};
