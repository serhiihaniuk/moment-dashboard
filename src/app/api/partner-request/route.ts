import cors from "@/shared/cors";
import { db } from "@/shared/db";
import { partnerRequestTable } from "@/shared/schema";
import { NextRequest, NextResponse } from "next/server";

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
    const { full_name, phone, email, brand_name } = body;

    // Validate required fields
    if (!full_name || !phone || !email || !brand_name) {
      return cors(
        request,
        new Response(null, {
          status: 400,
        })
      );
    }

    // Insert partner request into the database
    await db.insert(partnerRequestTable).values({
      full_name,
      phone,
      email,
      brand_name,
    });

    return cors(
      request,
      new Response(null, {
        status: 200,
      })
    );
  } catch (error) {
    console.error("Error in partner request route:", error);
    return cors(
      request,
      new Response(null, {
        status: 500,
      })
    );
  }
}

export async function GET() {
  try {
    const partnerRequests = await db.select().from(partnerRequestTable);

    return NextResponse.json(partnerRequests, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching partner requests:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
