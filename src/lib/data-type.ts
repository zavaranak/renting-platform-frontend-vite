import { UserAttributes } from "@/store/auth-store";
import {
  AuthActions,
  BookingStatusSchema,
  LivingPlaceType,
  LivingPlaceTypeSchema,
  Operator,
  Order,
  PaymentSchema,
  PlaceAttributeName,
  PlaceAttributeNameSchema,
  PlaceStatus,
  PlaceStatusSchema,
  Role,
  Status,
  TermUnit,
  TermUnitSchema,
  UserStatusSchema,
  WorkingPlaceType,
  WorkingPlaceTypeSchema,
} from "./contanst";
import { z } from "zod";

export const UserAttributeSchema = z.object({
  __typename: z.string(),
  value: z.string(),
  name: z.string(),
  id: z.string(),
});

export type Attribute = z.infer<typeof UserAttributeSchema>;

export const UserSchema = z.object({
  username: z.string(),
  id: z.string(),
  status: UserStatusSchema,
  attributes: z.array(UserAttributeSchema),
});

export type User = {
  username: string;
  id: string;
  status: Status;
  attributes?: Attribute[];
  role: Role;
};

export type LoginData = {
  username: string;
  password: string;
  action: AuthActions;
  role: Role;
};
export const PlaceAttributeSchema = z.object({
  id: z.string(),
  name: PlaceAttributeNameSchema,
  valueNumber: z.number().nullable(),
  value: z.string(),
});

export type PlaceAttribute = z.infer<typeof PlaceAttributeSchema>;

export const PlaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  type: z.array(z.union([WorkingPlaceTypeSchema, LivingPlaceTypeSchema])),
  termUnit: z.array(TermUnitSchema),
  area: z.number().positive(),
  createdAt: z.number().positive(),
  lastUpdate: z.number(),
  rating: z.number(),
  photos: z.array(z.string()).nullable(),
  status: PlaceStatusSchema,
  landlord: UserSchema.optional(),
  distanceFromCenter: z.number(),
  attributes: z.array(PlaceAttributeSchema),
});

export type Place = z.infer<typeof PlaceSchema>;

export type ResponseVerify = {
  user: User;
  attributes: Attribute[];
};
export type QueryCondition = {
  attributeName?: string;
  value: string;
  key: string;
  operator: Operator;
};

export interface QueryPagination {
  skip: number;
  take: number;
}

export type QueryOrder = {
  attributeName: string | null;
  by: string;
  order: Order;
};

export interface BookingInput {
  startAt?: number;
  endAt?: number;
  termUnit: string;
  period: number;
  totalCharge: number;
  tenantId?: string;
  placeId: string;
  payment: string;
  guests?: string[];
}

export type SelectedDate = {
  end: number;
  start: number;
};

export type Guest = {
  id?: string;
  birthday: number;
  createdAt?: number;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  middleName?: string;
  tel: string;
  tenantId: string;
};

export type UpdateGuestParams = {
  id: string;
  birthday?: number;
  email?: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  middleName?: string;
  tel?: string;
};

export type AttributeUpdateInput = {
  id: string;
  value?: string;
  valueNumber?: number;
};

export type UserAttributeInput = {
  name: keyof UserAttributes;
  value: string;
};

export type QueryManyInput = {
  conditions?: QueryCondition[];
  orderBy?: QueryOrder;
  pagination?: QueryPagination;
  selectedDate?: SelectedDate;
};

export const PendingBookingSchema = z.object({
  id: z.string(),
  createdAt: z.number().positive(),
  lastUpdate: z.number().positive(),
  startAt: z.number().positive(),
  endAt: z.number().positive(),
  termUnit: TermUnitSchema,
  period: z.number().positive(),
  totalCharge: z.number().positive(),
  tenantId: z.string(),
  placeId: z.string(),
  payment: PaymentSchema,
  guests: z.array(z.string()),
});

export type PendingBooking = z.infer<typeof PendingBookingSchema>;

export const ActiveBookingSchema = z.object({
  id: z.string(),
  createdAt: z.number().positive(),
  lastUpdate: z.number().positive(),
  startAt: z.number().positive(),
  endAt: z.number().positive(),
  termUnit: TermUnitSchema,
  period: z.number(),
  totalCharge: z.number().positive(),
  tenantId: z.string(),
  payment: PaymentSchema,
  placeId: z.string(),
  paidDate: z.number().nullable(),
  guests: z.array(z.string()),
});

export type ActiveBooking = z.infer<typeof ActiveBookingSchema>;

export const CompletedBookingSchema = z.object({
  id: z.string(),
  createdAt: z.number().positive(),
  lastUpdate: z.number().positive(),
  startAt: z.number().positive(),
  endAt: z.number().positive(),
  termUnit: TermUnitSchema,
  period: z.number().positive(),
  status: BookingStatusSchema,
  totalCharge: z.number().positive(),
  paidDate: z.number().nullable(),
  tenantId: z.string(),
  placeId: z.string(),
  reviews: z.array(z.string()).nullable(),
  guests: z.array(z.string()),
});

export type CompletedBooking = z.infer<typeof CompletedBookingSchema>;
