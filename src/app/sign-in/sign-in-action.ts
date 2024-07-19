"use server";
import { db } from "@/shared/db";
import { userTable } from "@/shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const signIn = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.username, username),
    });

    if (!user) {
      return { error: "User not found" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { error: "Invalid password" };
    }

    // Here you would typically set up a session or JWT
    // For this example, we'll just return a success message
    return { success: true };
  } catch (error) {
    console.error("Sign-in error:", error);
    return { error: "An unexpected error occurred" };
  }
};
