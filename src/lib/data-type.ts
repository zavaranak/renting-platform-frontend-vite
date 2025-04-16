import { UserAttributes } from "@/store/auth-store";
import {
  AuthActions,
  BookingStatusSchema,
  LivingPlaceType,
  Operator,
  Order,
  Payment,
  PaymentSchema,
  PlaceAttributeName,
  PlaceStatus,
  Role,
  Status,
  TermUnit,
  TermUnitSchema,
  WorkingPlaceType,
} from "./contanst";
import { number, z } from "zod";

export type Attribute = {
  __typename: string;
  value: string;
  name: string;
  id: string;
};

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

export type Place = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  type: WorkingPlaceType[] | LivingPlaceType[];
  termUnit: TermUnit[];
  area: number;
  createdAt: number;
  lastUpdate: number;
  rating?: number;
  photos?: string[];
  status: PlaceStatus;
  landlord: User;
  distanceFromCenter: number;
  attributes?: PlaceAttribute[];
};

export type PlaceAttribute = {
  id?: string;

  name: PlaceAttributeName;

  valueNumber?: number;

  value: string;
};
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

export type TenantAttributeInput = {
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
