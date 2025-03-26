import { create } from "zustand";
import { Attribute, User } from "@/lib/data-type";
import { deleteCookie } from "@/lib/cookies-handler";

export interface UserAttributes {
  FIRSTNAME: Attribute | undefined;
  LASTNAME: Attribute | undefined;
  MIDDLENAME: Attribute | undefined;
  BIRTHDAY: Attribute | undefined;
  TEL: Attribute | undefined;
  DOCUMENT: Attribute | undefined;
  GENDER: Attribute | undefined;
  COUNTRY: Attribute | undefined;
  AVATAR: Attribute | undefined;
}

const userAttributesSample: UserAttributes = {
  FIRSTNAME: undefined,
  LASTNAME: undefined,
  MIDDLENAME: undefined,
  BIRTHDAY: undefined,
  TEL: undefined,
  DOCUMENT: undefined,
  GENDER: undefined,
  COUNTRY: undefined,
  AVATAR: undefined,
};

interface AuthState {
  user: User | undefined;
  userAttributes: UserAttributes;
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
  userAttributes: userAttributesSample,
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
    if (user) {
      const attributes = user.attributes;
      set({
        user,
        userAttributes: attributes
          ? parseAttributes(attributes)
          : userAttributesSample,
      });
    }
  },
  setUserAttributes: (attributes) => {
    set({
      userAttributes: attributes
        ? parseAttributes(attributes)
        : userAttributesSample,
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

const parseAttributes = (attributes: Attribute[]): UserAttributes => {
  const temp: UserAttributes = userAttributesSample;

  attributes.forEach((attribute) => {
    if (attribute.name && attribute.value) {
      temp[attribute.name as keyof UserAttributes] = attribute;
    }
  });

  return temp;
};
