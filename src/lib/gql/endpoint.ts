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
      username
      password
      id
    }
  }
`;
export const TENANTS = gql`
  query {
    getTenants {
      username
      password
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
        status
      }
      tenant {
        username
        id
        status
      }
      access_token
    }
  }
`;

export const PLACES = gql`
  query GetPlaces($queryManyInput: QueryManyInput!) {
    getPlaces(query_many_input: $queryManyInput) {
      name
      id
      address
      city
      country
      type
      termUnit
      area
      createdAt
      lastUpdate
      photos
      status
      landlord {
        id
        username
      }
      attributes {
        name
        valueNumber
      }
    }
  }
`;
export const CITES = gql`
  query GetCities($countryName: String) {
    getCities(country_name: $countryName) {
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
