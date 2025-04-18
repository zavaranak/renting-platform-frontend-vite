import {
  ActiveBookingSchema,
  PendingBookingSchema,
  PlaceSchema,
} from "./data-type";

export const isPendingBooking = (data: any): boolean => {
  return PendingBookingSchema.safeParse(data).success;
};

export const isActiveBooking = (data: any): boolean => {
  return ActiveBookingSchema.safeParse(data).success;
};

export const isPlace = (data: any): boolean => {
  // console.log(PlaceSchema.safeParse(data).error);
  return PlaceSchema.safeParse(data).success;
};
