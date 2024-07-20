"use client";

import React from "react";
import { createContext, useContext } from "react";
import { Session } from "lucia";
import { User } from "../schema";

type Props = {
  children?: React.ReactNode;
  user: User;
  session: Session;
};

export const AuthContext = createContext<Props | undefined>(undefined);

export const AuthProvider = ({ children, user, session }: Props) => {
  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
