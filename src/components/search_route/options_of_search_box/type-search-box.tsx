import {
  livingPlaceType,
  Purpose,
  SearchOption,
  workingPlaceType,
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
      setType("");
      handleSearch({ searchOption: SearchOption.TYPE, valid: false });
    }
  };
  const handleChangeType = (value: string) => {
    value;
    if (Object.values(workingPlaceType).includes(value as workingPlaceType)) {
      setType(value as workingPlaceType);
    }
    if (Object.values(livingPlaceType).includes(value as livingPlaceType)) {
      setType(value as livingPlaceType);
    }

    const searchOption: SearchOptionState = {
      searchOption: SearchOption.TYPE,
      valid:
        purpose === Purpose.LIVING
          ? Object.values(livingPlaceType).includes(value as livingPlaceType) &&
            guest.adults > 0
          : purpose === Purpose.WORKING
          ? Object.values(workingPlaceType).includes(value as workingPlaceType)
          : false,
    };
    handleSearch(searchOption);
  };

  return (
    <div className="w-full  border-2 border-neutral_brown border-b-transparent p-5">
      <div className="text-sm uppercase font-bold pb-6">
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
                    Object.entries(livingPlaceType).map((entry, index) => (
                      <CommandItem
                        value={entry[1]}
                        key={index}
                        onSelect={(currentValue) => {
                          handleChangeType(currentValue);
                          setOpenTypeBox(false);
                        }}
                      >
                        {entry[1]}
                      </CommandItem>
                    ))}
                  {purpose === Purpose.WORKING &&
                    Object.entries(workingPlaceType).map((entry, index) => (
                      <CommandItem
                        value={entry[1]}
                        key={index}
                        onSelect={(currentValue) => {
                          handleChangeType(currentValue);
                          setOpenTypeBox(false);
                        }}
                      >
                        {entry[1]}
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
