import { useSearchStore } from "@/store/search-store";
import { useQuery } from "@apollo/client";
import { CITIES, COUNTRIES } from "@/lib/gql/endpoint";

export const UseFetchCountriesAndCites = () => {
  const { location, countries, cities, setCountries, setCities } =
    useSearchStore((state) => state);
  useQuery(COUNTRIES, {
    skip: location.country != "" && countries.length > 0,
    onCompleted: (data) => {
      setCountries(data.getCountries.customData);
    },
  });
  useQuery(CITIES, {
    skip:
      location.country == "" ||
      !countries.includes(location.country) ||
      cities.length > 0,
    onCompleted: (data) => {
      setCities(data.getCitiesByCountryName.customData);
    },
    variables: {
      country_name: location.country,
    },
  });
};
