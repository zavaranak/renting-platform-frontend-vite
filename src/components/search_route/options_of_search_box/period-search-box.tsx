import { TermUnit } from "@/lib/contanst";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export interface PeriodSearchBoxProps {
  term: TermUnit;
}

export default function PeriodSearchBox({ term }: PeriodSearchBoxProps) {
  return (
    <>
      <div className="text-sm uppercase font-bold">
        Select the period you want to rent?
      </div>
      <div>
        {term === TermUnit.HOUR && (
          <DateTimeRangePicker
            localeText={{
              start: "Check-in",
              end: "Check-out",
            }}
            onChange={(value) => {
              console.log(value);
            }}
          />
        )}
        {term === TermUnit.DAY && (
          <DateRangePicker
            localeText={{
              start: "Check-in",
              end: "Check-out",
            }}
            onChange={(value) => {
              console.log(value);
            }}
          />
        )}
      </div>
    </>
  );
}
