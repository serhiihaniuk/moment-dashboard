"use server";
import { db } from "@/shared/db";
import { userTable } from "@/shared/schema";
import { eq } from "drizzle-orm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcrypt";
export const signUp = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!username || !password || !confirmPassword) {
    return { error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    // Check if user already exists
    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.username, username),
    });

    if (existingUser) {
      return { error: "Username already exists" };
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    await db.insert(userTable).values({
      username,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("Sign-up error:", error);
    return { error: "An unexpected error occurred" };
  }
};
