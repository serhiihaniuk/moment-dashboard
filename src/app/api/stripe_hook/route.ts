import { db } from "@/shared/db";
import { ticketTable } from "@/shared/schema";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { extractInstagramUsername } from "@/shared/util";
import { generateAndStoreQRCode, sendEmail } from "./util";

interface CustomField {
  key: string;
  text: { value: string };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type !== "checkout.session.completed") {
      return NextResponse.json(
        { message: "Unhandled event type" },
        { status: 400 }
      );
    }

    const id = nanoid(10);
    const customFields: CustomField[] = body.data.object.custom_fields || [];
    const customerDetails = body.data.object.customer_details || {};

    const name =
      customFields.find((field) => field.key === "name")?.text?.value || "";
    const email = customerDetails.email;
    const phone = customerDetails.phone;
    const instagram = extractInstagramUsername(
      customFields.find((field) => field.key.toLowerCase() === "instagram")
        ?.text.value || ""
    );
    const grade = body.data.object?.metadata?.ticket;

    if (!grade) {
      return NextResponse.json({
        received: true,
        message: "Ticket grade not found",
      });
    }

    const event_id = body.id || "unknown";

    const qrCodeUrl = await generateAndStoreQRCode(
      `https://dashboard.nailmoment.pl/ticket/${id}`,
      `qr-code-${id}.png`
    );

    await db.insert(ticketTable).values({
      id,
      name,
      email,
      phone,
      instagram,
      qr_code: qrCodeUrl,
      grade,
      event_id,
    });

    await sendEmail(
      email,
      name,
      qrCodeUrl,
      grade.toLowerCase() as "fan" | "vip" | "premium"
    );

    return NextResponse.json({ received: true, ticketId: id, qrCodeUrl });
  } catch (error) {
    console.error("Error in stripe_hook route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
