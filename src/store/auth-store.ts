import { create } from "zustand";
import { Attribute, User } from "@lib/data-type";
import { deleteCookie } from "@lib/utils";

interface AuthState {
  user: User | undefined;
  userAttributes: Attribute[];
  token: string | undefined;
  isAuthenticated: boolean;
  setAuth: (token: string | undefined) => void;
  setUser: (user: User | undefined) => void;
  logOut: () => void;
  setUserAttributes: (attributes: Attribute[]) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: undefined,
  token: undefined,
  userAttributes: [],
  isAuthenticated: false,

  setAuth: (token) => {
    if (token) {
      set({
        token,
        isAuthenticated: true,
      });
    }
  },

  setUser: (user) => {
    if (user)
      set({
        user,
        userAttributes: user.attributes,
      });
  },
  setUserAttributes: (attributes) => {
    set({
      userAttributes: attributes,
    });
  },
  logOut: () => {
    deleteCookie("jwt");
    set({
      user: undefined,
      token: undefined,
      isAuthenticated: false,
    });
  },
}));
