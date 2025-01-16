import { Purpose, SortOptions, TermUnit, Facilities } from "@lib/contanst";

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { SortOptionsInterface, useSearchStore } from "@store/search-store";
import { useState } from "react";

export default function SortSearchBox() {
  const { sort, setSort, filter, setFilter } = useSearchStore((state) => state);
  const [showFilter, setShowFilter] = useState(false);
  const handleFilter = (value: string) => {
    if (filter.includes(value)) {
      const newFilter = filter.filter((item) => item != value);
      setFilter(newFilter);
    } else {
      const newFilter = [...filter, value];
      setFilter(newFilter);
    }
  };
  return (
    <div className="w-full  border-2 border-neutral_brown border-b-transparent p-5">
      <div className="text-sm uppercase font-bold pb-6">
        Sort your search results by:
      </div>
      <div className="grid grid-cols-3 gap-2">
        {/*select price*/}
        <FormControl className="flex content-center w-full">
          <InputLabel id="input-price">Price</InputLabel>
          <Select
            id="select-price-select"
            label="SORT"
            value={sort.price}
            onChange={(e) => {
              const newSort: SortOptionsInterface = { ...sort };
              newSort.price = e.target.value;
              setSort(newSort);
            }}
          >
            <MenuItem value="" disabled>
              Renting price
            </MenuItem>
            {Object.entries(SortOptions.price).map((entry, index) => (
              <MenuItem value={entry[1]} key={index}>
                {entry[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/*select purpose*/}
        <FormControl className="flex content-center w-full">
          <InputLabel id="input-area">Area</InputLabel>
          <Select
            id="select-area"
            label="SORT"
            value={sort.area}
            onChange={(e) => {
              const newSort: SortOptionsInterface = { ...sort };
              newSort.area = e.target.value;
              setSort(newSort);
            }}
          >
            <MenuItem value="" disabled>
              Place's area
            </MenuItem>
            {Object.entries(SortOptions.area).map((entry, index) => (
              <MenuItem value={entry[1]} key={index}>
                {entry[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/*select position*/}
        <FormControl className="flex content-center w-full">
          <InputLabel id="input-position">Position</InputLabel>
          <Select
            id="select-position"
            label="SORT"
            value={sort.position}
            onChange={(e) => {
              const newSort: SortOptionsInterface = { ...sort };
              newSort.position = e.target.value;
              setSort(newSort);
            }}
          >
            <MenuItem value="" disabled>
              Distance from center
            </MenuItem>
            {Object.entries(SortOptions.position).map((entry, index) => (
              <MenuItem value={entry[1]} key={index}>
                {entry[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="col-span-3 w-full flex flex-col items-center">
          <div
            className="cursor-pointer bold"
            onClick={() => {
              setShowFilter((prev) => !prev);
            }}
          >
            Filter
          </div>
          <FormGroup>
            <div className="grid grid-cols-3">
              {showFilter &&
                Object.keys(Facilities).map((key) => {
                  return (
                    <FormControlLabel
                      key={key}
                      control={<Checkbox />}
                      onChange={() => handleFilter(key)}
                      label={Facilities[key as keyof typeof Facilities]}
                    />
                  );
                })}
            </div>
          </FormGroup>
        </div>
      </div>
    </div>
  );
}
