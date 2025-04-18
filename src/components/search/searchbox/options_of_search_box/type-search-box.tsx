import {
  LivingPlaceType,
  Purpose,
  SearchOption,
  WorkingPlaceType,
} from "@/lib/contanst";
import { SearchOptionState, useSearchStore } from "@/store/search-store";
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
import { useState } from "react";

export default function TypeSearchBox() {
  const { purpose, setPurpose, type, setType, guest, handleSearch } =
    useSearchStore((state) => state);

  const [openPurposeBox, setOpenPurposeBox] = useState(false);
  const [openTypeBox, setOpenTypeBox] = useState(false);

  const handleChangePurpose = (value: string) => {
    if (purpose !== value) {
      setPurpose(value as Purpose);
      if (value == Purpose.LIVING) {
        setType(LivingPlaceType.HOUSE);
      } else if (value == Purpose.WORKING) {
        setType(WorkingPlaceType.OFFICE);
      }
      handleSearch({ searchOption: SearchOption.TYPE, valid: true });
    }
  };
  const handleChangeType = (value: string) => {
    value;
    if (Object.values(WorkingPlaceType).includes(value as WorkingPlaceType)) {
      setType(value as WorkingPlaceType);
    }
    if (Object.values(LivingPlaceType).includes(value as LivingPlaceType)) {
      setType(value as LivingPlaceType);
    }

    const searchOption: SearchOptionState = {
      searchOption: SearchOption.TYPE,
      valid:
        purpose === Purpose.LIVING
          ? Object.values(LivingPlaceType).includes(value as LivingPlaceType) &&
            guest.adults > 0
          : purpose === Purpose.WORKING
          ? Object.values(WorkingPlaceType).includes(value as WorkingPlaceType)
          : false,
    };
    handleSearch(searchOption);
  };

  return (
    <div>
      <div className="text-sm uppercase font-bold pb-3 z-10">
        What kind of place you want to rent?
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Popover open={openPurposeBox} onOpenChange={setOpenPurposeBox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPurposeBox}
              className="w-[300px] justify-between"
            >
              {purpose ? purpose : "Select purpose"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search purpose..." />
              <CommandList>
                <CommandEmpty>No purpose can be found.</CommandEmpty>
                <CommandGroup>
                  {Object.entries(Purpose).map((purposeItem, index) => (
                    <CommandItem
                      key={index}
                      value={purposeItem[1]}
                      onSelect={(currentValue) => {
                        handleChangePurpose(currentValue);
                        setOpenPurposeBox(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          purpose === purposeItem[1]
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {purposeItem[1]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={openTypeBox} onOpenChange={setOpenTypeBox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openTypeBox}
              className="w-[300px%] justify-between"
            >
              {type ? type : "Select type"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search type..." />
              <CommandList>
                <CommandEmpty>No type can be found</CommandEmpty>
                <CommandGroup>
                  {purpose === Purpose.LIVING &&
                    Object.values(LivingPlaceType).map((value, index) => (
                      <CommandItem
                        value={value}
                        key={index}
                        onSelect={(currentValue) => {
                          handleChangeType(currentValue);
                          setOpenTypeBox(false);
                        }}
                      >
                        {value}
                      </CommandItem>
                    ))}
                  {purpose === Purpose.WORKING &&
                    Object.values(WorkingPlaceType).map((value, index) => (
                      <CommandItem
                        value={value}
                        key={index}
                        onSelect={(currentValue) => {
                          handleChangeType(currentValue);
                          setOpenTypeBox(false);
                        }}
                      >
                        {value}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/* {purpose === Purpose.LIVING && <GuestSearchBox></GuestSearchBox>} */}
    </div>
  );
}
