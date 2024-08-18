import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/db";
import { concursRegistrationTable } from "@/shared/schema";
import cors from "@/shared/cors";

export async function OPTIONS(request: Request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { first_name, last_name, phone, email, instagram, category } = body;

    // Validate required fields
    if (
      !first_name ||
      !last_name ||
      !phone ||
      !email ||
      !instagram ||
      !category
    ) {
      return cors(
        request,
        new Response(null, {
          status: 400,
        })
      );
    }

    // Insert concurs registration into the database
    await db.insert(concursRegistrationTable).values({
      first_name,
      last_name,
      phone,
      email,
      instagram,
      category,
    });

    return cors(
      request,
      new Response(null, {
        status: 200,
      })
    );
  } catch (error) {
    console.error("Error in concurs registration route:", error);
    return cors(
      request,
      new Response(null, {
        status: 500,
      })
    );
  }
}
