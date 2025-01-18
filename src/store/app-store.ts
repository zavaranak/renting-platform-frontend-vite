import { create } from "zustand";

interface AppState {
  authWarningForCreateBooking: boolean;
  setAuthWaringForCreateBooking: (data: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  authWarningForCreateBooking: false,
  setAuthWaringForCreateBooking: (data: boolean) => {
    set({
      authWarningForCreateBooking: data,
    });
  },
}));
