import {
  AuthActions,
  livingPlaceType,
  Operator,
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
  id?: string;

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

  // @OneToMany(() => Booking, (booking) => booking.place)
  // @Field(() => [Booking], { nullable: true })
  // bookings?: Booking[];

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
  value: string;
  key: string;
  operator: Operator;
};

export interface QueryPagination {
  skip: number;
  take: number;
}
