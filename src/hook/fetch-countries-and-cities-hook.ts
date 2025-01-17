import { useSearchStore } from "@store/search-store";
import { useQuery } from "@apollo/client";
import { CITIES_COUNTRIES } from "@lib/gql/endpoint";

export const UseFetchCountriesAndCites = () => {
  const { locationMap, setMap } = useSearchStore((state) => state);

  useQuery(CITIES_COUNTRIES, {
    skip: locationMap.size > 0,
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      console.log(data.getCities.customData);
      const map = new Map<string, string[]>();
      const cities_countries = data.getCities.customData;
      const newCities: string[] = [];
      const newCountries: string[] = [];
      cities_countries.forEach((item: string) => {
        const parts = item.split("|");
        if (parts.length == 2) {
          if (map.has(parts[1])) {
            map.set(parts[1], [...(map.get(parts[1]) ?? []), parts[0]]);
          } else {
            newCountries.push(parts[1]);
            map.set(parts[1], [parts[0]]);
          }
          newCities.push(parts[0]);
        }
      });
      console.log(map.keys());
      setMap(map);
    },
  });
};
