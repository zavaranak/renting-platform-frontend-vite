import { SortOptions, Facilities } from "@/lib/contanst";

import { FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { SortOptionsInterface, useSearchStore } from "@/store/search-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export default function SortSearchBox() {
  const { sort, setSort, filter, setFilter } = useSearchStore((state) => state);
  const [openFilter, setOpenFilter] = useState(false);
  const [openPriceSort, setOpenPriceSort] = useState(false);
  const [openAreaSort, setOpenAreaSort] = useState(false);
  const [openPositionSort, setOpenPositionSort] = useState(false);
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
        <Popover open={openPriceSort} onOpenChange={setOpenPriceSort}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPriceSort}
              className="w-full justify-between"
            >
              {sort.price ? sort.price : "sort by price"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {Object.entries(SortOptions.price).map((entry, index) => (
                    <CommandItem
                      value={entry[1]}
                      key={index}
                      onSelect={(value) => {
                        const newSort: SortOptionsInterface = { ...sort };
                        newSort.price = value;
                        setSort(newSort);
                        setOpenPriceSort(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          sort.price === entry[1] ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {entry[1]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {/*select area*/}
        <Popover open={openAreaSort} onOpenChange={setOpenAreaSort}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openAreaSort}
              className="w-full justify-between"
            >
              {sort.area ? sort.area : "sort by area"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {Object.entries(SortOptions.area).map((entry, index) => (
                    <CommandItem
                      value={entry[1]}
                      key={index}
                      onSelect={(value) => {
                        const newSort: SortOptionsInterface = { ...sort };
                        newSort.area = value;
                        setSort(newSort);
                        setOpenAreaSort(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          sort.area === entry[1] ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {entry[1]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {/*select position*/}
        <Popover open={openPositionSort} onOpenChange={setOpenPositionSort}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPositionSort}
              className="w-full justify-between"
            >
              {sort.position ? sort.position : "sort by position"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {Object.entries(SortOptions.position).map((entry, index) => (
                    <CommandItem
                      value={entry[1]}
                      key={index}
                      onSelect={(value) => {
                        const newSort: SortOptionsInterface = { ...sort };
                        newSort.position = value;
                        setSort(newSort);
                        setOpenPositionSort(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          sort.position === entry[1]
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {entry[1]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="col-span-3 w-full flex flex-col items-center">
          <div
            className="cursor-pointer bold"
            onClick={() => {
              setOpenFilter((prev) => !prev);
            }}
          >
            Filter
          </div>
          <FormGroup>
            <div className="grid grid-cols-3">
              {openFilter &&
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
