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
        tenantId
      }
    }
  }
`;
