import { AuthProvider } from "@/shared/auth-provider";
import { validateRequest } from "@/shared/validate-request";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, session } = await validateRequest();
  console.log(user, session);

  if (!user || !session) {
    redirect("/sign-in");
  }

  return (
    <AuthProvider user={user} session={session}>
      {children}
    </AuthProvider>
  );
}
