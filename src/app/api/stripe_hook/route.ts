import { db } from "@/shared/db";
import { ticketTable } from "@/shared/schema";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    if (body.type === "checkout.session.completed") {
      const id = nanoid(10);
      const name = body.data.object.custom_fields.find(
        (field: any) => field.key === "name"
      )?.text.value;
      const email = body.data.object.customer_details.email;
      const phone = body.data.object.customer_details.phone;
      const instagram = body.data.object.custom_fields.find(
        (field: any) => field.key.toLowerCase() === "instagram"
      )?.text.value;

      console.log("data to pass", { id, name, email, phone, instagram });

      db.insert(ticketTable).values({
        id,
        name,
        email,
        phone,
        instagram,
      });
    }
  } catch (error) {
    console.error("Error in stripe_hook route:", error);
  }

  return NextResponse.json({ received: true });
}
