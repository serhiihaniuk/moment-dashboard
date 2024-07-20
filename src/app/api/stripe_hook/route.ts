import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  console.log("body", body);
  const signature = request.headers.get("stripe-signature") || "";
  let event: Stripe.Event;

  try {
    console.log("trying to construct event", body, signature);
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log("constructed event", event);
  } catch (err: any) {
    console.error(
      `Webhook signature verification failed: ${
        err instanceof Error ? err.message : err
      }`
    );
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  console.log("event constructed successfully");

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log(`PaymentIntent ${paymentIntent.id} was successful!`);

    // TODO: Handle the successful payment
  }

  // Handle other event types if needed

  return NextResponse.json({ received: true });
}
