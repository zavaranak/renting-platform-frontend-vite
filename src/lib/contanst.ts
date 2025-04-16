import { z } from "zod";

export enum Term {
  LONG = "long_term",
  SHORT = "short_term",
}
export enum Status {
  verified = "verified",
}

export enum Purpose {
  LIVING = "for living",
  WORKING = "for business",
}

export enum TermUnit {
  HOUR = "HOUR",
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
}

export const TermUnitSchema = z.nativeEnum(TermUnit);

export enum SearchOption {
  LOCATION = "location",
  TYPE = "type",
  SORT = "sort",
}

export enum LivingPlaceType {
  HOUSE = "HOUSE",
  APARTMENT = "APARTMENT",
  DORMITORY = "DORMITORY",
  STUDIO = "STUDIO",
  HOTEL = "HOTEL",
}
export const LivingPlaceTypeSchema = z.nativeEnum(LivingPlaceType);

export enum WorkingPlaceType {
  OFFICE = "OFFICE",
  WORKSHOP = "WORKSHOP",
  FACTORY = "FACTORY",
  STUDIO = "STUDIO",
  WAREHOURSE = "WAREHOURSE",
  SHOPHOUSE = "SHOPHOUSE",
  COWORKING_SPACE = "COWORKING_SPACE",
  EVENT_SPACE = "EVENT_SPACE",
}
export const WorkingPlaceTypeSchema = z.nativeEnum(WorkingPlaceType);

export enum PlaceType {
  HOUSE = "HOUSE",
  APARTMENT = "APARTMENT",
  DORMITORY = "DORMITORY",
  STUDIO = "STUDIO",
  HOTEL = "HOTEL",
  OFFICE = "OFFICE",
  WORKSHOP = "WORKSHOP",
  FACTORY = "FACTORY",
  WAREHOURSE = "WAREHOURSE",
  SHOPHOUSE = "SHOPHOUSE",
  COWORKING_SPACE = "COWORKING_SPACE",
  EVENT_SPACE = "EVENT_SPACE",
}
export const PlaceTypeSchema = z.nativeEnum(PlaceType);

export enum AuthActions {
  LOG_IN = "LOG_IN",
  SIGN_UP = "SIGN_UP",
}

export const AuthActionsSchema = z.nativeEnum(AuthActions);

export type LoginData = {
  role: string;
  action: AuthActions;
  username: string;
  password: string;
};

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
};
export const GenderSchema = z.nativeEnum(Gender);

export enum Role {
  landlord = "LANDLORD",
  tenant = "TENANT",
}
export const RoleSchema = z.nativeEnum(Role);

export enum TenantAttributeName {
  FIRSTNAME = "FIRSTNAME",
  LASTNAME = "LASTNAME",
  MIDDLENAME = "MIDDLENAME",
  TEL = "TEL",
  GENDER = "GENDER",
  BIRTHDAY = "BIRTHDAY",
  DOCUMENT = "DOCUMENT",
  COUNTRY = "COUNTRY",
  AVATAR = "AVATAR",
}
export const TenantAttributeNameSchema = z.nativeEnum(TenantAttributeName);

export enum LandlordAttributeName {
  FIRSTNAME = "FIRSTNAME",
  LASTNAME = "LASTNAME",
  MIDDLENAME = "MIDDLENAME",
  TEL = "TEL",
  GENDER = "GENDER",
  COMPANY = "COMPANY",
  BIRTHDAY = "BIRTHDAY",
  AVATAR = "AVATAR",
  DOCUMENT = "DOCUMENT",
  COUNTRY = "COUNTRY",
}
export const LandlordAttributeNameSchema = z.nativeEnum(LandlordAttributeName);

export enum Operator {
  EQUAL = "EQUAL",
  GREATER = "GREATER",
  SMALLER = "SMALLER",
  GREATER_AND_EQUAL = "GREATER_AND_EQUAL",
  SMALLER_AND_EQUAL = "SMALLER_AND_EQUAL",
  INCLUDE = "INCLUDE",
}
export const OperatorSchema = z.nativeEnum(Operator);

export enum PlaceStatus {
  FOR_RENT = "FOR_RENT",
  NOT_FORENT = "NOT_FORENT",
  OCCUPIED = "OCCUPIED",
}

export const PlaceStatusSchema = z.nativeEnum(PlaceStatus);

export enum PlaceAttributeName {
  PRIVATE_BATHROOM = "PRIVATE_BATHROOM",
  PRIVATE_KITCHEN = "PRIVATE_KITCHEN",
  SHARED_BATHROOM = "SHARED_BATHROOM",
  SHARED_KITCHEN = "SHARED_KITCHEN",
  LAUNDRY = "LAUNDRY",
  AIR_CONDITIONER = "AIR_CONDITIONER",
  WIFI = "WIFI",
  ETHERNET = "ETHERNET",
  FURNISHED = "FURNISHED",
  PARKING = "PARKING",
  BALCONY = "BALCONY",
  PET_FRIENDLY = "PET_FRIENDLY",
  SMOKING_ALLOWED = "SMOKING_ALLOWED",
  ELEVATOR = "ELEVATOR",
  GYM = "GYM",
  POOL = "POOL",
  HEATING = "HEATING",
  ROOM_SERVICE = "ROOM_SERVICE",
  SECURITY = "SECURITY",
  GARDEN = "GARDEN",
  PLAYGROUND = "PLAYGROUND",
  PRICE_BY_HOUR = "PRICE_BY_HOUR",
  PRICE_BY_DAY = "PRICE_BY_DAY",
  PRICE_BY_WEEK = "PRICE_BY_WEEK",
  PRICE_BY_MONTH = "PRICE_BY_MONTH",
  MAX_GUEST = "MAX_GUEST",
}

export const PlaceAttributeNameSchema = z.nativeEnum(PlaceAttributeName);

export const Facilities = {
  PRIVATE_BATHROOM: "PRIVATE_BATHROOM",
  PRIVATE_KITCHEN: "PRIVATE_KITCHEN",
  SHARED_BATHROOM: "SHARED_BATHROOM",
  SHARED_KITCHEN: "SHARED_KITCHEN",
  LAUNDRY: "LAUNDRY",
  AIR_CONDITIONER: "AIR_CONDITIONER",
  WIFI: "WIFI",
  ETHERNET: "ETHERNET",
  FURNISHED: "FURNISHED",
  PARKING: "PARKING",
  BALCONY: "BALCONY",
  PET_FRIENDLY: "PET_FRIENDLY",
  SMOKING_ALLOWED: "SMOKING_ALLOWED",
  ELEVATOR: "ELEVATOR",
  GYM: "GYM",
  POOL: "POOL",
  HEATING: "HEATING",
  ROOM_SERVICE: "ROOM_SERVICE",
  SECURITY: "SECURITY",
  GARDEN: "GARDEN",
  PLAYGROUND: "PLAYGROUND",
};

export const searchOptionData = {
  location: {
    content: "location",
  },
  type: {
    content: "type",
  },
  // period: {
  //   content: 'period',
  // },
  // guest: {
  //   content: 'guest',
  // },
  sort: {
    content: "sort",
  },
};

export const SortOptions = {
  price: {
    default: "skip",
    cheap: "Low price",
    expensive: "High price",
  },
  area: {
    default: "skip",
    big_area: "Large area",
    small_area: "Small area",
  },

  position: {
    default: "skip",
    near_center: "Near to center",
    far_center: "Far from center",
  },

  rating: "High rating",
  guest: "Number of guests",
};

export enum Order {
  asc = "asc",
  desc = "desc",
}
export const OrderSchema = z.nativeEnum(Order);

export type AbstractAttributesType = typeof PlaceAttributeName &
  typeof TenantAttributeName &
  typeof LandlordAttributeName;

export enum Payment {
  CASH = "CASH",
  CARD = "CARD",
}
export const PaymentSchema = z.nativeEnum(Payment);

export const BookingStatusSchema = z.enum(["canceled", "completed"]);
