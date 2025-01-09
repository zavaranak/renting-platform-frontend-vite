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
  YEAR = "year",
}

export enum SearchOption {
  LOCATION = "location",
  TYPE = "type",
  // PERIOD = 'period',
  // GUEST = 'guest',
  TERM = "term",
}

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
  term: {
    content: "term",
  },
};

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

export enum Role {
  landlord = "LANDLORD",
  tenant = "TENANT",
}

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

export interface ResponseVerify {
  user: User;
  attributes: Attribute[];
}

export enum Operator {
  EQUAL = "EQUAL",
  GREATER = "GREATER",
  SMALLER = "SMALLER",
  GREATER_AND_EQUAL = "GREATER_AND_EQUAL",
  SMALLER_AND_EQUAL = "SMALLER_AND_EQUAL",
  INCLUDE = "INCLUDE",
}
export interface QueryCondition {
  value: string;
  key: string;
  operator: Operator;
}

export interface QueryPagination {
  skip: number;
  take: number;
}
