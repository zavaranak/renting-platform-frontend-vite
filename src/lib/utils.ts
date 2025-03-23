import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Guest, UpdateGuestParams } from "./data-type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseGuestToUpdateGuestParams(guest: Guest): UpdateGuestParams {
  const { id, birthday, email, firstName, gender, lastName, middleName, tel } =
    guest;
  return {
    id: id!, // Ensure `id` is required for updates
    ...(birthday !== undefined && { birthday }),
    ...(email !== undefined && { email }),
    ...(firstName !== undefined && { firstName }),
    ...(gender !== undefined && { gender }),
    ...(lastName !== undefined && { lastName }),
    ...(middleName !== undefined && { middleName }),
    ...(tel !== undefined && { tel }),
  };
}
