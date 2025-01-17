import {
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { LocationParam, useSearchStore } from "@store/search-store";
import { SearchOption, TermUnit } from "@lib/contanst";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function LocationSearchBox() {
  const {
    location,
    setLocation,
    handleSearch,
    type,
    locationMap,
    term,
    setTerm,
  } = useSearchStore((state) => state);
  const [city_location, setCityLocation] = useState(location as LocationParam);
  const [country, setCountry] = useState(location.country);
  const [cities, setCities] = useState([] as LocationParam[]);
  const [countries, setCountries] = useState([] as string[]);
  const [filteredCountries, setFilteredCountries] = useState([""]);
  const [filteredCites, setFilteredCities] = useState([] as LocationParam[]);

  useEffect(() => {
    const newCities: LocationParam[] = [];
    const newCountries: string[] = [];
    locationMap.forEach((value, key) => {
      newCountries.includes(key) || newCountries.push(key);
      value.forEach((v) => {
        const newCityLocation: LocationParam = {
          city: v,
          country: key,
        };
        newCities.push(newCityLocation);
      });
      setCountries(newCountries);
      setCities(newCities);
    });
  }, [locationMap]);

  const handleChangeTerm = (e: SelectChangeEvent) => {
    const tempTerm = e.target.value as TermUnit;
    setTerm(tempTerm);
    validateSearchParams(location, tempTerm);
  };

  const validateSearchParams = (
    location: LocationParam,
    term: TermUnit | ""
  ) => {
    if (
      locationMap.has(location.country) &&
      locationMap.get(location.country)?.includes(location.city)
    ) {
      setLocation(location);
      setCountry(location.country);
      setFilteredCountries([]);
      if (term != "") {
        handleSearch({
          searchOption: SearchOption.LOCATION,
          valid: true,
        });
      }
    } else {
      handleSearch({
        searchOption: SearchOption.LOCATION,
        valid: false,
      });
    }
  };

  const handleCountryInput = (value: string) => {
    const filter =
      value.length > 0
        ? countries.filter((x) => {
            return x.startsWith(value.toLowerCase());
          })
        : [];
    setFilteredCountries(filter);
    setCountry(value);
    handleCityInput({ city: "", country: value });
  };
  const handleCityInput = (value: LocationParam) => {
    const filter =
      value.city.length > 0
        ? cities.filter((x) => {
            return x.city.startsWith(value.city.toLowerCase());
          })
        : [];
    setFilteredCities(filter);
    setCityLocation(value);
    validateSearchParams(value, term);
  };

  useEffect(() => {
    if (type) {
      handleSearch({
        searchOption: SearchOption.TYPE,
        valid: true,
      });
    }
    if (city_location && term) {
      handleSearch({
        searchOption: SearchOption.LOCATION,
        valid: true,
      });
    }
  }, []);

  return (
    <div className="w-full  border-2 border-neutral_brown border-b-transparent p-5">
      <div className="text-sm uppercase font-bold pb-6">
        where would you like to stay?
      </div>
      <div className="grid grid-cols-3 gap-x-10 mt-2">
        <FormControl className="relative">
          <InputLabel>Country</InputLabel>
          <Input
            name="country_input"
            type="text"
            value={country}
            onChange={(e) => handleCountryInput(e.target.value)}
            onFocus={() => setFilteredCountries(countries)}
          />
          <div
            className={clsx(
              filteredCountries.length == 0 && "hidden",
              "absolute bottom-[-20px]"
            )}
          >
            {filteredCountries.map((c, index) => {
              return (
                <div
                  key={c + index}
                  onClick={() => {
                    handleCountryInput(c);
                    setFilteredCountries([]);
                  }}
                >
                  {c}
                </div>
              );
            })}
          </div>
        </FormControl>
        <FormControl className="relative">
          <InputLabel>City</InputLabel>
          <Input
            name="city_input"
            type="text"
            value={city_location.city}
            onChange={(e) => handleCityInput({ city: e.target.value, country })}
            onFocus={() => setFilteredCities(cities)}
          />
          <div
            className={clsx(
              filteredCites.length == 0 && "hidden",
              "absolute bottom-[-20px]"
            )}
          >
            {filteredCites.map((c) => {
              return (
                <button
                  key={c.city + "|" + c.country}
                  onClick={() => {
                    handleCityInput(c);
                    setFilteredCities([]);
                  }}
                >
                  <p>{c.city}</p>
                  {country == "" && <p>|{c.country}</p>}
                </button>
              );
            })}
          </div>
        </FormControl>
        <FormControl className="flex content-center w-full">
          <InputLabel id="select-purpose">Term</InputLabel>
          <Select
            id="select-purpose"
            label="Term"
            value={term}
            onChange={handleChangeTerm}
          >
            <MenuItem value="" disabled>
              Select Term
            </MenuItem>
            {Object.entries(TermUnit).map((entry, index) => (
              <MenuItem value={entry[1]} key={index}>
                {entry[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
