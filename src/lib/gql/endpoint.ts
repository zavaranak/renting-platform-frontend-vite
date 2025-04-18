import { gql } from "@apollo/client";

export const VERIFY_USER = gql`
  query {
    verifyUser {
      message
      tenant {
        id
        username
        status
        attributes {
          name
          value
          id
        }
      }
      landlord {
        id
        username
        status
        attributes {
          name
          value
          id
        }
      }
    }
  }
`;

export const TENANT = gql`
  query {
    getTenant {
      username
      password
      id
    }
  }
`;

export const LANDLORD_ATTRIBUTES = gql`
  query {
    getLanlord {
      attributes
    }
  }
`;

export const LANDLORDS = gql`
  query {
    getLandlords {
      id
    }
  }
`;
export const TENANTS = gql`
  query {
    getTenants {
      id
    }
  }
`;

export const LOGIN = gql`
  mutation ($userInput: UserInput!) {
    logIn(userInput: $userInput) {
      message
      landlord {
        username
        id
      }
      tenant {
        username
        id
      }
      access_token
    }
  }
`;

export const QUERY_PLACES_ID = gql`
  query GetPlaces($queryManyInput: QueryManyInput!) {
    getPlaces(query_many_input: $queryManyInput) {
      id
    }
  }
`;
export const QUERY_PLACE_BY_ID = gql`
  query GetOnePlace($value: String!, $type: String!) {
    getOnePlace(value: $value, type: $type) {
      address
      area
      attributes {
        id
        name
        value
        valueNumber
      }
      city
      country
      createdAt
      id
      landlord {
        id
      }
      name
      photos
      rating
      status
      termUnit
      type
      lastUpdate
      distanceFromCenter
    }
  }
`;
export const CITIES = gql`
  query GetCitiesByCountryName($countryName: String) {
    getCitiesByCountryName(country_name: $countryName) {
      type
      message
      customData
    }
  }
`;
export const COUNTRIES = gql`
  query GetCountries {
    getCountries {
      customData
      type
      message
    }
  }
`;
export const CITIES_COUNTRIES = gql`
  query GetCities {
    getCities {
      customData
      type
      message
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking($bookingInput: BookingInput!) {
    createBooking(bookingInput: $bookingInput) {
      message
      pendingBooking {
        id
      }
      type
    }
  }
`;
export const CREATE_GUEST = gql`
  mutation Mutation($input: CreateGuestInput!) {
    createGuest(input: $input) {
      message
      type
      guest {
        id
      }
    }
  }
`;
export const GET_GUEST_BY_ID = gql`
  query GetOneGuest($value: String!, $type: String!) {
    getOneGuest(value: $value, type: $type) {
      message
      type
      guest {
        birthday
        createdAt
        email
        firstName
        gender
        lastName
        middleName
        tel
        tenantId
      }
    }
  }
`;
export const GET_ALL_GUESTS_BY_ID = gql`
  query GetGuests($value: String!, $type: String!) {
    getGuests(value: $value, type: $type) {
      type
      message
      guests {
        id
        birthday
        createdAt
        email
        firstName
        gender
        lastName
        middleName
        tel
      }
    }
  }
`;

export const UPDATE_GUEST = gql`
  mutation UpdateGuest($updateGuestId: String!, $input: UpdateGuestInput!) {
    updateGuest(id: $updateGuestId, input: $input) {
      message
      type
      guest {
        id
        tenantId
      }
    }
  }
`;

export const UPDATE_TENANT_ATTRIBUTES = gql`
  mutation tenantAttribute($attibuteUpdateInput: [AttributeUpdateInput!]!) {
    updateTenantAttributes(attibuteUpdateInput: $attibuteUpdateInput) {
      message
      type
    }
  }
`;
export const ADD_TENANT_ATTRIBUTES = gql`
  mutation tenantAttribute(
    $tenantId: String!
    $attributesInput: [TenantAttributeInput!]!
  ) {
    addTenantAtributes(tenantId: $tenantId, attributesInput: $attributesInput) {
      message
      type
    }
  }
`;

export const QUERY_PENDING_BOOKINGS = gql`
  query GetManyPendingBooking($queryManyInput: QueryManyInput!) {
    getManyPendingBooking(query_many_input: $queryManyInput) {
      id
      placeId
      payment
      createdAt
      termUnit
      startAt
      endAt
      lastUpdate
      guests
      period
      tenantId
      totalCharge
    }
  }
`;

export const CANCEL_PENDING_BOOKING = gql`
  mutation CancelPendingBooking($pendingBookingId: String!) {
    cancelPendingBooking(pendingBookingId: $pendingBookingId) {
      type
      message
    }
  }
`;

export const QUERY_ACTIVE_BOOKINGS = gql`
  query GetManyActiveBooking($queryManyInput: QueryManyInput!) {
    getManyActiveBooking(query_many_input: $queryManyInput) {
      createdAt
      endAt
      guests
      id
      lastUpdate
      paidDate
      payment
      period
      placeId
      startAt
      tenantId
      termUnit
      totalCharge
    }
  }
`;
export const QUERY_COMPLETED_BOOKINGS = gql`
  query GetManyCompletedBooking($queryManyInput: QueryManyInput!) {
    getManyCompletedBooking(query_many_input: $queryManyInput) {
      createdAt
      endAt
      guests
      id
      lastUpdate
      paidDate
      period
      placeId
      startAt
      status
      tenantId
      termUnit
      totalCharge
    }
  }
`;

export const QUERY_PLACES_WITH_DATA = gql`
  query getPlaces($queryManyInput: QueryManyInput!) {
    getPlaces(query_many_input: $queryManyInput) {
      id
      address
      area
      city
      country
      createdAt
      lastUpdate
      name
      photos
      priority
      rating
      status
      termUnit
      type
      distanceFromCenter
      attributes {
        id
        name
        value
        valueNumber
      }
    }
  }
`;

export const ADD_LANDLORD_ATTRIBUTES = gql`
  mutation AddLandlordAtributes(
    $landlordId: String!
    $attributesInput: [LandlordAttributeInput!]!
  ) {
    addLandlordAtributes(
      landlordId: $landlordId
      attributesInput: $attributesInput
    ) {
      message
      type
    }
  }
`;

export const UPDATE_LANDLORD_ATTRIBUTES = gql`
  mutation UpdateLandlordAttributes(
    $attibuteUpdateInput: [AttributeUpdateInput!]!
  ) {
    updateLandlordAttributes(attibuteUpdateInput: $attibuteUpdateInput) {
      message
      type
    }
  }
`;
