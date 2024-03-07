import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "@/config/firebaseConfig";
import { Auth, onAuthStateChanged, User } from "firebase/auth";

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface UserContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  id?: string;
}

export const UserStateContext = createContext<UserContextState>(
  {} as UserContextState
);
export interface AuthContextModel {
  auth: Auth;
  user: User | null;
  userState: UserState;
  email: String;
}

export const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
);

export function useAuth(): AuthContextModel {
  return useContext(AuthContext);
}

type UserState = "registered" | "notVerified" | "visitor" | "loading";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userState, setUserState] = useState<UserState>("loading");
  const [email, setEmail] = useState("");
  console.log(userState);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setEmail(user.email as string);

      {
        if (user.emailVerified) {
          setUserState("registered");
        } else if (user.emailVerified === false) {
          setUserState("notVerified");
        }
      }
    } else {
      setUserState("visitor");
    }
  });

  useEffect(() => {
    const unsubsrcibe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubsrcibe;
  }, []);

  const values = {
    user,
    auth,
    userState,
    email,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUserContext = (): UserContextState => {
  return useContext(UserStateContext);
};
