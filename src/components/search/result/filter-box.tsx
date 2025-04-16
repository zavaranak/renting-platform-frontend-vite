import { SortOptionsInterface, useSearchStore } from "@/store/search-store";
import { SideBox } from "@/components/static_components/side-box";
import clsx from "clsx";
import { useState } from "react";
import {
  Facilities,
  LivingPlaceType,
  Purpose,
  WorkingPlaceType,
  SearchOption,
  SortOptions,
} from "@/lib/contanst";
import { Card, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import SearchButton from "@/components/search/searchbox/search-button";
import { UseFetchCountriesAndCites } from "@/hook/place.hook";

export const FilterBox = () => {
  UseFetchCountriesAndCites();
  const [openSortBox, setOpenSortBox] = useState(false);
  const [openFilterBox, setOpenFilterBox] = useState(false);
  const {
    type,
    purpose,
    filter,
    sort,
    canSearch,
    handleSearch,
    setType,
    setFilter,
    setSort,
  } = useSearchStore((state) => state);

  const handleTypeChange = (e: any) => {
    const newType = e.target.value;
    setType(newType);
    const checkedType = newType != "";
    checkSearch(checkedType);
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
  const checkSearch = (checkedType?: boolean) => {
    handleSearch({
      searchOption: SearchOption.TYPE,
      valid: checkedType != undefined ? true : type != undefined,
    });
    handleSearch({
      searchOption: SearchOption.LOCATION,
      valid: true,
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
  return (
    <SideBox>
      <Card className="flex bg-background_brown flex-col gap-3 p-3">
        <div className="flex gap-3">
          <label className="flex">
            <p>Type</p>
            <select onChange={handleTypeChange} value={type ?? ""}>
              <option value="">--</option>
              {purpose == Purpose.LIVING ? (
                Object.keys(LivingPlaceType).map((key) => (
                  <option
                    key={key}
                    value={LivingPlaceType[key as keyof typeof LivingPlaceType]}
                  >
                    {LivingPlaceType[key as keyof typeof LivingPlaceType]}
                  </option>
                ))
              ) : purpose == Purpose.WORKING ? (
                Object.keys(WorkingPlaceType).map((key) => (
                  <option
                    key={key}
                    value={
                      WorkingPlaceType[key as keyof typeof WorkingPlaceType]
                    }
                  >
                    {WorkingPlaceType[key as keyof typeof WorkingPlaceType]}
                  </option>
                ))
              ) : (
                <option value={undefined}>--</option>
              )}
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
        <SearchButton />
      </Card>
    </SideBox>
    // </div>
  );
};
