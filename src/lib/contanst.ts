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
  HOUR = "hour",
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
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
  HOUSE = "house",
  APARTMENT = "apartment",
  DORMITORY = "dormitory",
  STUDIO = "studio",
  HOTEL = "hotel",
}
export enum workingPlaceType {
  OFFICE = "office",
  WORKSHOP = "workshop",
  FACTORY = "factory",
  STUDIO = "studio",
  WAREHOURSE = "warehourse",
  SHOPHOUSE = "shop house",
  COWORKING_SPACE = "coworking space",
  EVENT_SPACE = "event space",
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

export enum Role {
  landlord = "LANDLORD",
  tenant = "TENANT",
}
export enum TenantAttributeName {
  FIRSTNAME = "first_name",
  LASTNAME = "last_name",
  MIDDLENAME = "middle_name",
  TEL = "tel",
  SEX = "sex",
  BIRTH_DAY = "birth_day",
  DOCUMENT = "document",
  COUNTRY = "country",
  AVATAR = "avatar",
}

export enum LandlordAttributeName {
  FIRSTNAME = "first_name",
  LASTNAME = "last_name",
  MIDDLENAME = "middle_name",
  TEL = "tel",
  COMPANY = "company",
  BIRTH_DAY = "birth_day",
  AVATAR = "avatar",
  DOCUMENT = "document",
  COUNTRY = "country",
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
  FOR_RENT = "for_rent",
  NOT_FORENT = "not_for_rent",
  OCCUPIED = "occupied",
}

export enum PlaceAttributeName {
  PRIVATE_BATHROOM = "private_bathroom",
  PRIVATE_KITCHEN = "private_kitchen",
  SHARED_BATHROOM = "shared_bathroom",
  SHARED_KITCHEN = "shared_kitchen",
  LAUNDRY = "laundry",
  AIR_CONDITIONER = "air_conditioner",
  WIFI = "wifi",
  ETHERNET = "ethernet",
  FURNISHED = "furnished",
  PARKING = "parking",
  BALCONY = "balcony",
  PET_FRIENDLY = "pet_friendly",
  SMOKING_ALLOWED = "smoking_allowed",
  ELEVATOR = "elevator",
  GYM = "gym",
  POOL = "pool",
  HEATING = "heating",
  ROOM_SERVICE = "room_service",
  SECURITY = "security",
  GARDEN = "garden",
  PLAYGROUND = "playground",
  PRICE_BY_HOUR = "price_by_hour",
  PRICE_BY_DAY = "price_by_day",
  PRICE_BY_WEEK = "price_by_week",
  PRICE_BY_MONTH = "price_by_month",
  MAX_GUEST = "max_guest",
}
export const Facilities = {
  PRIVATE_BATHROOM: "private bathroom",
  PRIVATE_KITCHEN: "private kitchen",
  SHARED_BATHROOM: "shared bathroom",
  SHARED_KITCHEN: "shared kitchen",
  LAUNDRY: "laundry",
  AIR_CONDITIONER: "air conditioner",
  WIFI: "wifi",
  ETHERNET: "ethernet",
  FURNISHED: "furnished",
  PARKING: "parking",
  BALCONY: "balcony",
  PET_FRIENDLY: "pet friendly",
  SMOKING_ALLOWED: "smoking allowed",
  ELEVATOR: "elevator",
  GYM: "gym",
  POOL: "pool",
  HEATING: "heating",
  ROOM_SERVICE: "room service",
  SECURITY: "security",
  GARDEN: "garden",
  PLAYGROUND: "playground",
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
