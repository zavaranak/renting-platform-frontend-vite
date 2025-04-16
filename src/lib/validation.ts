import { ActiveBookingSchema, PendingBookingSchema } from "./data-type";

export const isPendingBooking = (data: any): boolean => {
  return PendingBookingSchema.safeParse(data).success;
};

export const isActiveBooking = (data: any): boolean => {
  return ActiveBookingSchema.safeParse(data).success;
};
