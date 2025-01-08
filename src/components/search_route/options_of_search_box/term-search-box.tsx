import { SearchOption, TermUnit } from "@lib/contanst";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchStore } from "@store/search-store";

export default function TermSearchBox() {
  const { term, setTerm, handleSearch } = useSearchStore((state) => state);
  const handleChangeTerm = (e: SelectChangeEvent) => {
    const tempTerm = e.target.value as TermUnit;
    setTerm(tempTerm);
    handleSearch({
      searchOption: SearchOption.TERM,
      valid: true,
    });
  };
  return (
    <div className="w-full  border-2 border-neutral_brown border-b-transparent p-5">
      <div className="text-sm uppercase font-bold pb-6">
        What kind of term you want to rent?
      </div>
      <div>
        <FormControl className="flex content-center w-full">
          <InputLabel id="select-purpose">Term</InputLabel>
          <Select
            id="select-purpose"
            label="Term"
            value={term}
            onChange={handleChangeTerm}
          >
            <MenuItem value="" disabled>
              Select Term
            </MenuItem>
            {Object.entries(TermUnit).map((entry, index) => (
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
