import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectedDate } from "@/lib/data-type";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import HourSelector from "./hour-combobox";

const hours = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString().padStart(2, "0"),
  label: i.toString().padStart(2, "0"),
}));

export function HourPicker() {
  // const [hourValue, setHourValue] = React.useState<SelectedDate | undefined>(
  //   undefined
  // );
  const [date, setDate] = React.useState<Date>();
  const [startHour, setStartHour] = React.useState("");
  const [endHour, setEndHour] = React.useState("");

  const handleHourStartValue = (value: number) => {
    if (value >= 0 && value <= 23) {
    }
  };
  const handleHourEndValue = (value: number) => {
    if (value >= 0 && value <= 23) {
    }
  };

  return (
    <div className="grid grid-cols-5 gap-1">
      <div className="col-span-5 grid grid-cols-5 gap-1 text-xs">
        <span className="col-span-3">Date</span>
        <span className="col-span-1">From</span>
        <span className="col-span-1">To</span>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "col-span-3 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <HourSelector value={startHour} setValue={setStartHour} />
      <HourSelector value={endHour} setValue={setEndHour} />
    </div>
  );
}
