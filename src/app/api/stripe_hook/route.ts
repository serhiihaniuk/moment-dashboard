import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.type === "payment_intent.succeeded") {
    const paymentIntent = body.data;

    // TODO: Handle the successful payment
  }

  if (body.type === "checkout.session.completed") {
    const session = body.data;
    console.log(body);
    console.log(body.custom_fields);
  }

  // Handle other event types if needed

  return NextResponse.json({ received: true });
}

/*
  body {
  "id": "evt_3PehuPFrJFBf1WKu1RX5eP2F",
  "object": "event",
  "api_version": "2024-06-20",
  "created": 1721499691,
  "data": {
    "object": {
      "id": "pi_3PehuPFrJFBf1WKu18mH4sIU",
      "object": "payment_intent",
      "amount": 300,
      "amount_capturable": 0,
      "amount_details": {
        "tip": {
        }
      },
      "amount_received": 300,
      "application": null,
      "application_fee_amount": null,
      "automatic_payment_methods": null,
      "canceled_at": null,
      "cancellation_reason": null,
      "capture_method": "automatic",
      "client_secret": "pi_3PehuPFrJFBf1WKu18mH4sIU_secret_crUyvB1TNspX6Xtck8lwJ896y",
      "confirmation_method": "automatic",
      "created": 1721499689,
      "currency": "pln",
      "customer": null,
      "description": null,
      "invoice": null,
      "last_payment_error": null,
      "latest_charge": "ch_3PehuPFrJFBf1WKu1TIwlQB9",
      "livemode": true,
      "metadata": {
      },
      "next_action": null,
      "on_behalf_of": null,
      "payment_method": "pm_1PehuPFrJFBf1WKuDgIFfEUf",
      "payment_method_configuration_details": null,
      "payment_method_options": {
        "card": {
          "installments": null,
          "mandate_options": null,
          "network": null,
          "request_three_d_secure": "automatic"
        }
      },
      "payment_method_types": [
        "card"
      ],
      "processing": null,
      "receipt_email": null,
      "review": null,
      "setup_future_usage": null,
      "shipping": null,
      "source": null,
      "statement_descriptor": null,
      "statement_descriptor_suffix": null,
      "status": "succeeded",
      "transfer_data": null,
      "transfer_group": null
    }
  },
  "livemode": true,
  "pending_webhooks": 2,
  "request": {
    "id": "req_TYwirSatVkwJvI",
    "idempotency_key": "805cf014-ca2a-4465-ad0c-2b519ab90ac1"
  },
  "type": "payment_intent.succeeded"
}

*/
