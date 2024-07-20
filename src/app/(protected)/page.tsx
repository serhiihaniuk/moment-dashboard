"use client";

import { useAuth } from "@/shared/provider/auth-provider";
import { useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const [url, setUrl] = useState<string | null>(null);
  // redirect to sign-in page if user is not authenticated

  if (!user) {
    return <h1>You are not authenticated</h1>;
  }

  let response: any = null;

  const sendEmail = async () => {
    const response = await fetch("/api/stripe_hook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responsePayload = await response.json();

    setUrl(responsePayload.code);

    if (!response.ok) {
      throw new Error("Failed to send email");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>Welcome, {user?.username}</h1>
      <button
        onClick={sendEmail}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Send Email{" "}
      </button>
      {url && <img src={url} alt="qr-code" />}
    </main>
  );
}
