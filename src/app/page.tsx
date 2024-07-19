import { db } from "@/shared/db";
import { userTable } from "@/shared/schema";
import { eq } from "drizzle-orm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
