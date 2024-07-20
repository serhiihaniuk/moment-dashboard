import { Resend } from "resend";
import { EmailTemplate } from "@/features/email-templates/template";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "serhii@nailmoment.pl",
      to: ["Rangesay@gmail.com"],
      subject: "Hello",
      text: "",
      react: EmailTemplate({ firstName: "John" }),
    });

    if (error) {
      console.error(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
