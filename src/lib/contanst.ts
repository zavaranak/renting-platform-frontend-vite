import { Place } from "@mui/icons-material";

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

export enum SearchOption {
  LOCATION = "location",
  TYPE = "type",
  // PERIOD = 'period',
  // GUEST = 'guest',
  // TERM = "term",
  SORT = "sort",
}

export enum livingPlaceType {
  HOUSE = "HOUSE",
  APARTMENT = "APARTMENT",
  DORMITORY = "DORMITORY",
  STUDIO = "STUDIO",
  HOTEL = "HOTEL",
}
export enum workingPlaceType {
  OFFICE = "OFFICE",
  WORKSHOP = "WORKSHOP",
  FACTORY = "FACTORY",
  STUDIO = "STUDIO",
  WAREHOURSE = "WAREHOURSE",
  SHOPHOUSE = "SHOPHOUSE",
  COWORKING_SPACE = "COWORKING_SPACE",
  EVENT_SPACE = "EVENT_SPACE",
}

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

export enum AuthActions {
  LOG_IN = "LOG_IN",
  SIGN_UP = "SIGN_UP",
}
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

export enum Role {
  landlord = "LANDLORD",
  tenant = "TENANT",
}
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

export enum Operator {
  EQUAL = "EQUAL",
  GREATER = "GREATER",
  SMALLER = "SMALLER",
  GREATER_AND_EQUAL = "GREATER_AND_EQUAL",
  SMALLER_AND_EQUAL = "SMALLER_AND_EQUAL",
  INCLUDE = "INCLUDE",
}

export enum PlaceStatus {
  FOR_RENT = "FOR_RENT",
  NOT_FORENT = "NOT_FORENT",
  OCCUPIED = "OCCUPIED",
}

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

export type AbstractAttributesType = typeof PlaceAttributeName &
  typeof TenantAttributeName &
  typeof LandlordAttributeName;

export enum Payment {
  CASH = "CASH",
  CARD = "CARD",
}
