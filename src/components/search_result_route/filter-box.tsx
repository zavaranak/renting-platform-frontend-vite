import { SortOptionsInterface, useSearchStore } from "@/store/search-store";
import { SideBox } from "@/components/boxes/side-box";
import clsx from "clsx";
import { useState, useEffect } from "react";
import {
  Facilities,
  livingPlaceType,
  Purpose,
  TermUnit,
  workingPlaceType,
  SearchOption,
  SortOptions,
} from "@/lib/contanst";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import SearchButton from "@/components/search_route/search-button";
import { UseFetchCountriesAndCites } from "@/hook/fetch-countries-and-cities-hook";

export const FilterBox = () => {
  UseFetchCountriesAndCites();
  const [openSortBox, setOpenSortBox] = useState(false);
  const [openFilterBox, setOpenFilterBox] = useState(false);
  const {
    term,
    type,
    location,
    purpose,
    filter,
    sort,
    locationMap,
    canSearch,
    setLocation,
    handleSearch,
    setPurpose,
    setTerm,
    setType,
    setFilter,
    setSort,
  } = useSearchStore((state) => state);
  const [locationState, setlocationState] = useState(location.city != "");
  const [locationString, setLocationString] = useState(
    location.city && location.country
      ? location.city + "|" + location.country
      : ""
  );
  const [filteredLocations, setFilteredLocations] = useState([] as string[]);
  const [allLocationsString, setAllLocationsString] = useState([] as string[]);
  const handleCityChange = (value: string) => {
    const parts = value.split("|");
    var check: boolean = false;
    if (parts.length == 2) {
      const newLocation = {
        city: parts[0],
        country: parts[1],
      };
      if (
        locationMap.has(newLocation.country) &&
        locationMap.get(newLocation.country)?.includes(newLocation.city)
      ) {
        setFilteredLocations([]);
        check = true;
      } else {
        handleFilteredLocations(value);
      }

      if (check) {
        setLocation(newLocation);
      }
    } else {
      handleFilteredLocations(value);
    }
    setLocationString(value);
    setlocationState(check);
    checkSearch(check);
  };
  const handlePurposeChange = (e: any) => {
    setPurpose(e.target.value);
    checkSearch();
  };
  const handleTermChange = (e: any) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    checkSearch();
  };
  const handleTypeChange = (e: any) => {
    const newType = e.target.value;
    setType(newType);
    const checkedType = newType != "";
    checkSearch(undefined, checkedType);
  };
  const handleFilter = (value: string) => {
    if (filter.includes(value)) {
      const newFilter = filter.filter((item) => item != value);
      setFilter(newFilter);
    } else {
      const newFilter = [...filter, value];
      setFilter(newFilter);
    }
    checkSearch();
  };
  const checkSearch = (checkedCity?: boolean, checkedType?: boolean) => {
    handleSearch({
      searchOption: SearchOption.TYPE,
      valid: checkedType != undefined ? true : type != "",
    });
    handleSearch({
      searchOption: SearchOption.LOCATION,
      valid: checkedCity != undefined ? checkedCity : locationState,
    });
  };
  const handleSort = (e: any, sortType: string) => {
    const newSort: SortOptionsInterface = { ...sort };
    switch (sortType) {
      case "price":
        newSort.price = e.target.value;
        break;
      case "area":
        newSort.area = e.target.value;
        break;
      case "position":
        newSort.position = e.target.value;
        break;
    }
    if (!canSearch) {
      checkSearch();
    }
    setSort(newSort);
  };
  const handleFilteredLocations = (value: string) => {
    const list: string[] =
      value != ""
        ? allLocationsString.filter((item) => item.includes(value))
        : [];
    setFilteredLocations(list);
  };
  useEffect(() => {
    const allLocations: string[] = [];
    const newCountries: string[] = [];
    locationMap.forEach((value, key) => {
      newCountries.includes(key) || newCountries.push(key);
      value.forEach((v) => {
        allLocations.push(`${v}|${key}`);
      });
      setAllLocationsString(allLocations);
    });
  }, [locationMap]);
  return (
    <SideBox>
      <div className="flex flex-col gap-3 p-3">
        <label
          className={clsx(
            "flex gap-3 relative",
            locationState || "text-red-700"
          )}
        >
          <p>Location</p>
          <input
            value={locationString}
            placeholder={"City"}
            onChange={(e) => handleCityChange(e.target.value)}
          />
          <div className="absolute flex flex-col gap-3 right-[65px] top-[20px]">
            {filteredLocations.length > 0 &&
              filteredLocations.map((item) => (
                <div
                  className="p-2  bg-neutral_grey"
                  onClick={() => {
                    handleCityChange(item);
                  }}
                >
                  {item}
                </div>
              ))}
          </div>
        </label>
        <label className="flex gap-3">
          <p>Purpose</p>
          <select onChange={handlePurposeChange} value={purpose ?? ""}>
            <option value="">--</option>
            {Object.values(Purpose).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-3">
          <label className="flex">
            <p>Type</p>
            <select onChange={handleTypeChange} value={type ?? ""}>
              <option value="">--</option>
              {purpose == Purpose.LIVING ? (
                Object.keys(livingPlaceType).map((key) => (
                  <option
                    key={key}
                    value={livingPlaceType[key as keyof typeof livingPlaceType]}
                  >
                    {livingPlaceType[key as keyof typeof livingPlaceType]}
                  </option>
                ))
              ) : purpose == Purpose.WORKING ? (
                Object.keys(workingPlaceType).map((key) => (
                  <option
                    key={key}
                    value={
                      workingPlaceType[key as keyof typeof workingPlaceType]
                    }
                  >
                    {workingPlaceType[key as keyof typeof workingPlaceType]}
                  </option>
                ))
              ) : (
                <option value={undefined}>--</option>
              )}
            </select>
          </label>
          <label className="flex">
            <p>Term</p>
            <select onChange={handleTermChange} value={term ?? ""}>
              <option value="">--</option>
              {Object.keys(TermUnit).map((key) => (
                <option
                  key={key}
                  value={TermUnit[key as keyof typeof TermUnit]}
                >
                  {TermUnit[key as keyof typeof TermUnit]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-col gap-3 relative">
          <p
            onClick={(e) => {
              e.stopPropagation();
              setOpenSortBox((state) => !state);
            }}
          >
            Sort by
          </p>
          <div
            className={clsx(
              "flex flex-col",
              openSortBox ? "visible" : "invisible"
            )}
          >
            <label className="grid grid-cols-2 gap-1">
              Price
              <select
                onChange={(e) => {
                  handleSort(e, "price");
                }}
                value={SortOptions.price.default}
              >
                <option value={SortOptions.price.default}>skip</option>
                <option value={SortOptions.price.expensive}>
                  from expensive
                </option>
                <option value={SortOptions.price.cheap}>from cheap</option>
              </select>
            </label>
            <label className="grid grid-cols-2 gap-1">
              Position
              <select
                onChange={(e) => {
                  handleSort(e, "position");
                }}
                value={SortOptions.position.default}
              >
                <option value={SortOptions.position.default}>skip</option>
                <option value={SortOptions.position.far_center}>
                  far center
                </option>
                <option value={SortOptions.position.near_center}>
                  near center
                </option>
              </select>
            </label>
            <label className="grid grid-cols-2 gap-1">
              Area
              <select
                onChange={(e) => {
                  handleSort(e, "area");
                }}
                value={SortOptions.area.default}
              >
                <option value={SortOptions.area.default}>skip</option>
                <option value={SortOptions.area.big_area}>large area</option>
                <option value={SortOptions.area.small_area}>small area</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <p
            onClick={(e) => {
              e.stopPropagation();
              setOpenFilterBox((state) => !state);
            }}
          >
            Filter
          </p>
          <div
            className={clsx(
              "flex flex-col h-52 overflow-y-scroll",
              openFilterBox ? "visible" : "invisible"
            )}
          >
            <FormGroup>
              {Object.keys(Facilities).map((key) => {
                return (
                  <FormControlLabel
                    key={key}
                    control={<Checkbox />}
                    onChange={() => handleFilter(key)}
                    label={Facilities[key as keyof typeof Facilities]}
                  />
                );
              })}
            </FormGroup>
          </div>
        </div>
        {/* {(true && <>Loading</>) || ( */}

        <SearchButton />
        {/* )} */}
      </div>
    </SideBox>
    // </div>
  );
};
