import {
  livingPlaceType,
  Purpose,
  SearchOption,
  workingPlaceType,
} from "@lib/contanst";
import GuestSearchBox from "./guest-search-box";
import { SearchOptionState, useSearchStore } from "@store/search-store";

import {
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";

export default function TypeSearchBox() {
  const { purpose, setPurpose, type, setType, guest, handleSearch } =
    useSearchStore((state) => state);

  const handleChangePurpose = (event: SelectChangeEvent) => {
    if (purpose !== (event.target.value as Purpose)) {
      setPurpose(event.target.value as Purpose);
      setType("");
      handleSearch({ searchOption: SearchOption.TYPE, valid: false });
    }
  };
  const handleChangeType = (event: SelectChangeEvent) => {
    const tempType = event.target.value as workingPlaceType | livingPlaceType;
    if (
      Object.values(workingPlaceType).includes(tempType as workingPlaceType)
    ) {
      setType(tempType as workingPlaceType);
    }
    if (Object.values(livingPlaceType).includes(tempType as livingPlaceType)) {
      setType(tempType as livingPlaceType);
    }

    const searchOption: SearchOptionState = {
      searchOption: SearchOption.TYPE,
      valid:
        purpose === Purpose.LIVING
          ? Object.values(livingPlaceType).includes(
              tempType as livingPlaceType
            ) && guest.adults > 0
          : purpose === Purpose.WORKING
          ? Object.values(workingPlaceType).includes(
              tempType as workingPlaceType
            )
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
        <FormControl className="flex content-center">
          <InputLabel id="select-purpose">Purpose</InputLabel>
          <Select
            labelId="select-purpose"
            label="Purpose"
            value={purpose}
            onChange={handleChangePurpose}
          >
            <MenuItem value="" disabled>
              Select Purpose
            </MenuItem>
            {Object.entries(Purpose).map((purpose, index) => (
              <MenuItem value={purpose[1]} key={index}>
                {purpose[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="flex content-center">
          <InputLabel id="select-type">Type</InputLabel>
          <Select
            labelId="selecte-type"
            className="w-full"
            label="Type"
            value={type}
            onChange={handleChangeType}
            disabled={!purpose}
          >
            <MenuItem value="" disabled>
              Select Type
            </MenuItem>
            {purpose === Purpose.LIVING &&
              Object.entries(livingPlaceType).map((entry, index) => (
                <MenuItem value={entry[1]} key={index}>
                  {entry[1]}
                </MenuItem>
              ))}

            {purpose === Purpose.WORKING &&
              Object.entries(workingPlaceType).map((entry, index) => (
                <MenuItem value={entry[1]} key={index}>
                  {entry[1]}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      {/* {purpose === Purpose.LIVING && <GuestSearchBox></GuestSearchBox>} */}
    </div>
  );
}
