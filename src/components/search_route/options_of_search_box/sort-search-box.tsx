import { SortOptions, TermUnit } from "@lib/contanst";

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { SortOptionsInterface, useSearchStore } from "@store/search-store";

export default function SortSearchBox() {
  const { sort, setSort } = useSearchStore((state) => state);
  const handleChangeSort = (e: SelectChangeEvent) => {
    // const tempSort = e.target.value;
    // if tempSort.include
    // setSort([tempSort]);
  };
  return (
    <div className="w-full  border-2 border-neutral_brown border-b-transparent p-5">
      <div className="text-sm uppercase font-bold pb-6">
        Sort your search results by:
      </div>
      <div className="grid grid-cols-3 gap-2">
        <FormControl className="flex content-center w-full">
          <InputLabel id="select-purpose">Price</InputLabel>
          <Select
            id="select-purpose"
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
        <FormControl className="flex content-center w-full">
          <InputLabel id="select-purpose">Area</InputLabel>
          <Select
            id="select-purpose"
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
        <FormControl className="flex content-center w-full">
          <InputLabel id="select-purpose">Position</InputLabel>
          <Select
            id="select-purpose"
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
      </div>
    </div>
  );
}
