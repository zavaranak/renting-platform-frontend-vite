import { FormControl, Input, InputLabel } from "@mui/material";
import { ChangeEvent } from "react";
import { LocationParam, useSearchStore } from "@store/search-store";
import { SearchOption } from "@lib/contanst";
import { useState } from "react";
import clsx from "clsx";
import { FilterCenterFocus } from "@mui/icons-material";

export default function LocationSearchBox() {
  const { location, setLocation, handleSearch, countries, cities } =
    useSearchStore((state) => state);
  const [city, setCity] = useState(location.city);
  const [country, setCountry] = useState(location.country);

  const [filteredCountries, setFilteredCountries] = useState([""]);
  const [filteredCites, setFilteredCities] = useState([""]);
  // const [city, setCity] = useState(location?.city);
  // const [country, setCountry] = useState(location?.country);

  // const handleLocationInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   const type = event.target.name;
  //   const value = event.target.value;
  //   const city = location ? location.city : "";
  //   const country = location ? location.country : "";
  //   const newLocation = {
  //     city: type === "city_input" ? value : city,
  //     country: type === "country_input" ? value : country,
  //   };
  //   setLocation(newLocation);
  //   validateLocation();
  // };

  const validateLocation = () => {
    const newLocation: LocationParam = {
      city: city,
      country: country,
    };

    if (newLocation) {
      if (newLocation.city !== "" && newLocation.country !== "") {
        setLocation(newLocation);
        handleSearch({
          searchOption: SearchOption.LOCATION,
          valid: true,
        });
        setFilteredCountries([]);
      } else if (newLocation.city === "" || newLocation.country === "") {
        handleSearch({
          searchOption: SearchOption.LOCATION,
          valid: false,
        });
      }
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
    validateLocation();
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
    validateLocation();
  };

  return (
    <div className="w-full  border-2 border-neutral_brown border-b-transparent p-5">
      <div className="text-sm uppercase font-bold pb-6">
        where would you like to stay?
      </div>
      <div className="grid grid-cols-2 gap-x-10 mt-2">
        <FormControl className="relative">
          <InputLabel>City</InputLabel>
          <Input
            name="city_input"
            type="text"
            value={city}
            onChange={(e) => handleCityInput(e.target.value)}
          />
          <div
            className={clsx(
              filteredCites.length == 0 && "hidden",
              "absolute bottom-0"
            )}
          >
            {filteredCites.map((c, index) => {
              return (
                <div
                  key={c + index}
                  onClick={() => {
                    handleCityInput(c);
                    setFilteredCities([]);
                  }}
                >
                  {c}
                </div>
              );
            })}
          </div>
        </FormControl>
        <FormControl className="relative">
          <InputLabel>Country</InputLabel>
          <Input
            name="country_input"
            type="text"
            value={country}
            onChange={(e) => handleCountryInput(e.target.value)}
          />
          <div
            className={clsx(
              filteredCountries.length == 0 && "hidden",
              "absolute bottom-[-15px]"
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
      </div>
    </div>
  );
}
