import { fetchUserControllerFindMe } from "@/services/api/raidar/raidarComponents";
import { UserDto } from "@/services/api/raidar/raidarSchemas";
import React, { useContext, useEffect, useState } from "react";

interface UserContextValue {
  user: UserDto | null;
  onLogin: (token: string) => void;
  onSignOut: () => void;
  getUser: () => void;
}

const UserContext = React.createContext<UserContextValue | null>(null);

export const UserContextProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDto | null>(null);
  const [roles, setRoles] = useState<"user" | "artist" | null>(null);

  const getUser = async () => {
    try {
      const userData = await fetchUserControllerFindMe({});
      localStorage.setItem("user", JSON.stringify(userData));
      setRoles(userData.roles);
      setUser(userData);
    } catch {
      setUser(null);
      setRoles(null);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUserControllerFindMe({});
        localStorage.setItem("user", JSON.stringify(userData));
        setRoles(userData.roles);
        setUser(userData);
      } catch {
        setUser(null);
        setRoles(null);
      }
    };

    if (token) {
      getUser();
    } else {
      setUser(null);
      setRoles(null);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      const existingToken = localStorage.getItem("token");
      if (existingToken) {
        setToken(existingToken);
      }
    }

    if (!user) {
      const existing = localStorage.getItem("user");
      if (existing) {
        setUser(JSON.parse(existing));
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        onLogin: (token: string) => {
          localStorage.setItem("token", token);
          setToken(token);
        },
        onSignOut: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
          setRoles(null);
        },
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
}
