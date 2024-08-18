import { db } from "@/shared/db";
import { partnerRequestTable } from "@/shared/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, phone, email, brand_name } = body;

    // Validate required fields
    if (!full_name || !phone || !email || !brand_name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
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
    });
  } catch (error) {
    console.error("Error in partner request route:", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
