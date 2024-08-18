"use server";
import { db } from "@/shared/db";
import { partnerRequestTable } from "@/shared/schema";

export const getPartnerRequests = async () => {
  try {
    const partnerRequests = await db.select().from(partnerRequestTable);
    return partnerRequests;
  } catch (error) {
    console.error("Error fetching partner requests:", error);
    return [];
  }
};
