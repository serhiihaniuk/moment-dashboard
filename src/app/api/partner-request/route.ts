import { db } from "@/shared/db";
import { partnerRequestTable } from "@/shared/schema";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://nailmoment.pl",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, phone, email, brand_name } = body;

    const headers = new Headers({
      "Access-Control-Allow-Origin": "https://nailmoment.pl",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });

    // Validate required fields
    if (!full_name || !phone || !email || !brand_name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers }
      );
    }

    // Insert partner request into the database
    await db.insert(partnerRequestTable).values({
      full_name,
      phone,
      email,
      brand_name,
    });

    return NextResponse.json({
      message: "Partner request submitted successfully",
      headers,
    });
  } catch (error) {
    console.error("Error in partner request route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
