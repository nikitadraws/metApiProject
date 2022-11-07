import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "FirebaseConfig";
import { useUserData } from "./hooks/useUserData";

interface LoginSignup {
  (auth: Auth, email: string, password: string): Promise<UserCredential>;
}

interface AppContextInterface {
  currentUser: User | undefined | null;
  signup: LoginSignup;
  login: LoginSignup;
  logout: (auth: Auth) => Promise<void>;
}

export const AuthContext = createContext({} as AppContextInterface);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | undefined | null>();

  useUserData(currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const signup: LoginSignup = (auth, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login: LoginSignup = (auth, email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = (auth: Auth) => {
    return signOut(auth);
  };

  const context: AppContextInterface = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}
