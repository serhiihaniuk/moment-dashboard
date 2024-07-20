import { db } from "@/shared/db";
import { ticketTable } from "@/shared/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.type === "checkout.session.completed") {
    const id = body.data.object.id;
    const name = body.data.object.customer_details.name;
    const email = body.data.object.customer_details.email;
    const phone = body.data.object.customer_details.phone;
    const instagram = body.data.object.custom_fields[0].text.value;

    console.log(
      "custom fields",
      body.data.object,
      body.data.object.custom_fields
    );

    console.log({ id, name, email, phone, instagram });

    db.insert(ticketTable).values({
      id,
      name,
      email,
      phone,
      instagram,
    });
  }

  return NextResponse.json({ received: true });
}
