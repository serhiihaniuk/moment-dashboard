"use server";

import { db } from "@/shared/db";
import { concursRegistrationTable } from "@/shared/schema";

export const getConcursRegistrations = async () => {
  try {
    const registrations = await db.select().from(concursRegistrationTable);
    return registrations;
  } catch (error) {
    console.error("Error fetching concurs registrations:", error);
    return [];
  }
};
