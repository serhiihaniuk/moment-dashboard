import { db } from "@/shared/db";
import QRCode from "qrcode";
import { ticketTable } from "@/shared/schema";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Resend } from "resend";
import { EmailTemplate } from "./email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type === "checkout.session.completed") {
      const id = nanoid(10);
      const name =
        body.data.object.custom_fields.find(
          (field: any) => field.key === "name"
        )?.text.value || "";
      const email = body.data.object.customer_details.email;
      const phone = body.data.object.customer_details.phone;
      const instagram = body.data.object.custom_fields.find(
        (field: any) => field.key.toLowerCase() === "instagram"
      )?.text.value;

      // Insert ticket into database
      await db.insert(ticketTable).values({
        id,
        name,
        email,
        phone,
        instagram,
      });

      // Generate QR code
      const qrCodeDataURL = await QRCode.toDataURL(
        `https://dashboard.nailmoment.pl/ticket/${id}`
      );

      console.log(qrCodeDataURL);

      // Send email
      const { data, error } = await resend.emails.send({
        from: "conference@nailmoment.pl",
        to: email,
        subject: "Ваш квиток на конференцію Nail Moment",
        html: "",
        react: EmailTemplate({ name, qrCodeUrl: qrCodeDataURL }),
      });

      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", data);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error in stripe_hook route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
