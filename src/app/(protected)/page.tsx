"use client";

import { useAuth } from "@/shared/provider/auth-provider";

export default function Home() {
  const { user } = useAuth();
  // redirect to sign-in page if user is not authenticated

  if (!user) {
    return <h1>You are not authenticated</h1>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome, {user?.username}</h1>
    </main>
  );
}
