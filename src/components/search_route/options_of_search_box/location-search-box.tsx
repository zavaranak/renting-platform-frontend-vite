import { LocationParam, useSearchStore } from "@/store/search-store";
import { SearchOption, TermUnit } from "@/lib/contanst";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export default function LocationSearchBox() {
  const {
    countries,
    cities,
    setCities,
    location,
    setLocation,
    handleSearch,
    term,
    setTerm,
  } = useSearchStore((state) => state);

  const [openTermBox, setOpenTermBox] = useState(false);
  const [city, setCity] = useState(location.city);
  const [country, setCountry] = useState(location.country);
  const [filteredCountries, setFilteredCountries] = useState([] as string[]);
  const [filteredCites, setFilteredCities] = useState([] as string[]);

  const handleChangeTerm = (value: TermUnit) => {
    setTerm(value);
    validateSearchParams(location, value);
  };

  const validateSearchParams = (
    passedLocation: LocationParam,
    term: TermUnit | ""
  ) => {
    if (
      countries.includes(passedLocation.country) &&
      cities.includes(passedLocation.city)
    ) {
      setLocation(passedLocation);
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
    setCountry(value);
    const filter =
      value.length > 0
        ? countries.filter((x) => {
            return x.startsWith(value.toLowerCase());
          })
        : [];
    setFilteredCountries(filter);
    setLocation({ country: value, city: "" });
    setCities([]);
    handleCityInput("");
  };
  const handleCityInput = (value: string) => {
    setCity(value);
    const filter =
      value != ""
        ? cities.filter((x) => {
            return x.startsWith(value.toLowerCase());
          })
        : [];
    setFilteredCities(filter);
    validateSearchParams({ city: value, country: location.country }, term);
  };
  useEffect(() => {
    if (city != "" && country != "") {
      handleSearch({
        searchOption: SearchOption.LOCATION,
        valid: true,
      });
    }
  }, []);

  return (
    <>
      <div className="text-sm uppercase font-bold pb-3">
        where would you like to stay?
      </div>
      <div className="grid grid-cols-3 gap-x-10 mt-2">
        <div className="grid w-full max-w-sm items-center gap-1.5 relative">
          <Label htmlFor="country_input">Country</Label>
          <Input
            name="country_input"
            value={country}
            type="text"
            onChange={(e) => handleCountryInput(e.target.value)}
          />
          <div
            className={cn(
              filteredCountries.length == 0 && "hidden",
              "absolute top-[100%] h-50 w-48 rounded-md border bg-white"
            )}
          >
            <ScrollArea className="h-50 w-48 rounded-md border">
              <div className="p-4">
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
                      <Separator className="my-2" />
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 relative">
          <Label htmlFor="city_input">City</Label>
          <Input
            name="city_input"
            type="text"
            value={city}
            onChange={(e) => handleCityInput(e.target.value)}
            // onFocus={() => setFilteredCities(cities)}
          />
          <div
            className={cn(
              filteredCites.length == 0 && "hidden",
              "absolute top-[100%] h-50 w-48 rounded-md border bg-white"
            )}
          >
            <ScrollArea className="h-50 w-48 rounded-md border">
              <div className="p-4">
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
                      <Separator className="my-2" />
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="none">Term</Label>
          <Popover open={openTermBox} onOpenChange={setOpenTermBox}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openTermBox}
                className="w-[300px%] justify-between"
              >
                {term ? term : "Select term"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search type..." />
                <CommandList>
                  <CommandEmpty>No type can be found</CommandEmpty>
                  <CommandGroup>
                    {Object.entries(TermUnit).map((entry, index) => (
                      <CommandItem
                        value={entry[1]}
                        key={index}
                        onSelect={(currentValue) => {
                          handleChangeTerm(currentValue as TermUnit);
                          setOpenTermBox(false);
                        }}
                      >
                        {entry[1]}
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            term === entry[1] ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
