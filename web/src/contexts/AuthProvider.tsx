import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextData {
  user: User | null;
  signed: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signOut: () => void;
}

interface User {
  name?: string;
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userToken: any = localStorage.getItem("user_token");

    if (userToken) {
      const hasUser = JSON.parse(userToken);

      if (hasUser) setUser(hasUser);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://127.0.0.1/api/login", {
        email,
        password,
      });
      const userData = response.data;
      localStorage.setItem("user_token", userData.token);
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return "Erro ao fazer login:";
    }
  };

  const signUp = (email: string, password: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd") || "");

    const hasUser = usersStorage?.filter((user: User) => user.email === email);

    if (hasUser?.length) {
      return "Already exist a account with this E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
