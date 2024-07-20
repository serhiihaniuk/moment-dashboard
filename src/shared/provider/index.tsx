import { redirect } from "next/navigation";

import { AuthProvider } from "./auth-provider";
import { validateRequest } from "../validate-request";

export const AppProvider = async ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
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
};
