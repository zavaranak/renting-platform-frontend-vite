import { UserAttributes } from "@/store/auth-store";
import {
  AuthActions,
  livingPlaceType,
  Operator,
  Order,
  Payment,
  PlaceAttributeName,
  PlaceStatus,
  Role,
  Status,
  TermUnit,
  workingPlaceType,
} from "./contanst";

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

  type: workingPlaceType[] | livingPlaceType[];

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

export type PendingBooking = {
  id: string;
  createdAt: number;
  lastUpdate: number;
  startAt: number;
  endAt: number;
  termUnit: TermUnit;
  period: number;
  totalCharge: number;
  tenantId: string;
  placeId: string;
  payment: Payment;
  updateBy: string;
  guests: string[];
};
