import { db } from "@/shared/db";
import { ticketTable } from "@/shared/schema";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { generateAndStoreQRCode, sendEmail } from "../util";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract necessary fields from the request body
    const id = nanoid(10);
    const { name, email, phone, instagram, grade } = body;

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
    });

    await sendEmail(email, name, qrCodeUrl);

    return NextResponse.json({ success: true, ticketId: id, qrCodeUrl });
  } catch (error) {
    console.error("Error in manual add ticket route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
