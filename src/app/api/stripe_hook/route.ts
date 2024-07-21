import { db } from "@/shared/db";
import QRCode from "qrcode";
import { ticketTable } from "@/shared/schema";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Resend } from "resend";
import { EmailTemplate } from "./email-template";
import { put } from "@vercel/blob";

const resend = new Resend(process.env.RESEND_API_KEY);

interface CustomField {
  key: string;
  text: { value: string };
}

async function generateAndStoreQRCode(
  url: string,
  filename: string
): Promise<string> {
  try {
    const qrBuffer = await QRCode.toBuffer(url);
    const blob = await put(filename, qrBuffer, {
      access: "public",
      contentType: "image/png",
    });
    return blob.url;
  } catch (error) {
    console.error("Error generating or storing QR code:", error);
    throw new Error("Failed to generate or store QR code");
  }
}

async function sendEmail(to: string, name: string, qrCodeUrl: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "conference@nailmoment.pl",
      to,
      subject: "Ваш квиток на конференцію Nail Moment",
      html: "",
      react: EmailTemplate({ name, qrCodeUrl }),
    });

    if (error) {
      throw error;
    }

    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
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
      customFields.find((field) => field.key === "name")?.text.value || "";
    const email = customerDetails.email;
    const phone = customerDetails.phone;
    const instagram = extractInstagramUsername(
      customFields.find((field) => field.key.toLowerCase() === "instagram")
        ?.text.value || ""
    );
    const grade = body.data.object.metadata.ticket || "unknown";

    const event_id = body.id || "unknown";

    const qrCodeUrl = await generateAndStoreQRCode(
      `https://dashboard.nailmoment.pl/ticket/${id}`,
      `qr-code-${id}.png`
    );

    console.log({ qrCodeUrl });

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

    // Send email
    await sendEmail(email, name, qrCodeUrl);

    return NextResponse.json({ received: true, ticketId: id, qrCodeUrl });
  } catch (error) {
    console.error("Error in stripe_hook route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 }
    );
  }
}

function extractInstagramUsername(inputString: string): string {
  // Remove leading/trailing whitespace
  inputString = inputString.trim();

  // Regular expression pattern to match Instagram usernames
  const pattern =
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?!p\/|explore\/|accounts\/)([A-Za-z0-9_.](?:(?:[A-Za-z0-9_.]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_])))?\/?/;

  // Try to find a match using the pattern
  const match = inputString.match(pattern);

  if (match && match[1]) {
    // If matched, return the captured username
    return match[1];
  } else {
    // If no match found, assume the input might be just the username
    // Remove any leading @ symbol and return
    return inputString.replace(/^@/, "");
  }
}

const ticketGrade = {
  plink_1PeyTlFrJFBf1WKuFvXfyWFM: "regular",
  plink_1PeyV5FrJFBf1WKuMZMYrOdf: "vip",
  plink_1PeyVwFrJFBf1WKuZwFg14O5: "premium",
};
