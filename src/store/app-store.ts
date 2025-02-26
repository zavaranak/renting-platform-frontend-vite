import { Place } from "@/lib/data-type";
import { create } from "zustand";

interface AppState {
  authWarningForCreateBooking: boolean;
  setAuthWaringForCreateBooking: (data: boolean) => void;
  placeFromNavigation: Place | undefined;
  setPlaceFromNavigation: (data: Place | undefined) => void;
}

export const useAppStore = create<AppState>((set) => ({
  placeFromNavigation: undefined,
  setPlaceFromNavigation: (data: Place | undefined) => {
    set({
      placeFromNavigation: data,
    });
  },

  authWarningForCreateBooking: false,
  setAuthWaringForCreateBooking: (data: boolean) => {
    set({
      authWarningForCreateBooking: data,
    });
  },
}));
