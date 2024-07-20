"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "./sign-in-action";

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await signIn(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      router.push("/");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        action={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          required
          className="rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          className="rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
