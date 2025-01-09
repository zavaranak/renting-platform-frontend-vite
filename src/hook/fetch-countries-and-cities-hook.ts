import { useSearchStore } from "@store/search-store";
import { useQuery } from "@apollo/client";
import { CITES, COUNTRIES } from "@lib/gql/endpoint";

export const UseFetchCountriesAndCites = () => {
  const { location, setCountries, setCities, countries } = useSearchStore(
    (state) => state
  );

  useQuery(COUNTRIES, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      console.log(data.getCountries.customData);
      setCountries(data.getCountries.customData);
    },
  });
  useQuery(CITES, {
    skip: !countries.includes(location.country),
    variables: {
      countryName: location.country ? location.country : null,
    },
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      console.log(data.getCities.customData);
      setCities(data.getCities.customData);
    },
  });
};
