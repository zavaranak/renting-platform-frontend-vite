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
    countries,
    cities,
    term,
    setTerm,
  } = useSearchStore((state) => state);
  const [city, setCity] = useState(location.city);
  const [country, setCountry] = useState(location.country);
  const [filteredCountries, setFilteredCountries] = useState([""]);
  const [filteredCites, setFilteredCities] = useState([""]);

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
      cities.includes(location.city) &&
      countries.includes(location.country)
    ) {
      setLocation({
        city: location.city,
        country: location.country,
      });

      setFilteredCountries([]);
      if (term != "") {
        handleSearch({
          searchOption: SearchOption.LOCATION,
          valid: true,
        });
      }
    } else if (
      !cities.includes(location.city) ||
      !countries.includes(location.country) ||
      term == ""
    ) {
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
    handleCityInput("");
    validateSearchParams({ city: city, country: value }, term);
  };
  const handleCityInput = (value: string) => {
    const filter =
      value.length > 0
        ? cities.filter((x) => {
            return x.startsWith(value.toLowerCase());
          })
        : [];
    setFilteredCities(filter);
    setCity(value);
    validateSearchParams({ city: value, country: country }, term);
  };

  useEffect(() => {
    return () => {
      if (cities.includes(city)) setLocation({ city, country });
    };
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
            value={city}
            onChange={(e) => handleCityInput(e.target.value)}
            onFocus={() => setFilteredCities(cities)}
          />
          <div
            className={clsx(
              filteredCites.length == 0 && "hidden",
              "absolute bottom-[-20px]"
            )}
          >
            {filteredCites.map((c, index) => {
              return (
                <button
                  key={c + index}
                  onClick={() => {
                    handleCityInput(c);
                    setFilteredCities([]);
                  }}
                >
                  {c}
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
