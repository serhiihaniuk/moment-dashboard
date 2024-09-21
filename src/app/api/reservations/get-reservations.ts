"use server";

import { db } from "@/shared/db";
import { reservationTable } from "@/shared/schema";

export const getReservations = async () => {
  try {
    const reservations = await db.select().from(reservationTable);
    return reservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
};
