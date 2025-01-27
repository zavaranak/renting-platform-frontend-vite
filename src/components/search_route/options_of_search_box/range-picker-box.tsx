import * as React from "react";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectedDate } from "@/lib/data-type";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [dateValue, setDateValue] = React.useState<SelectedDate | undefined>(
    undefined
  );
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dayjs().hour(12).minute(0).second(0).millisecond(0).toDate(),
    to: undefined,
  });

  const handleNewDate = (value: DateRange | undefined) => {
    if (value?.from && value?.to) {
      if (value.from.getTime() === value.to.getTime()) {
        setDate({ from: undefined, to: undefined });
      } else {
        const adjustedFrom = dayjs(value.from)
          .hour(14)
          .minute(0)
          .second(0)
          .toDate();
        const adjustedTo = dayjs(value.to)
          .hour(12)
          .minute(0)
          .second(0)
          .toDate();

        setDateValue({
          start: adjustedFrom.getTime(), // Use the adjusted date
          end: adjustedTo.getTime(), // Use the adjusted date
        });
        setDate(value);
      }
    } else {
      setDateValue(undefined);
      setDate(value);
    }
  };
  React.useEffect(() => {}, [dateValue]);
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from)
                    .add(14, "hour")
                    .format("MMM DD, YYYY h:mm A")}{" "}
                  -{" "}
                  {dayjs(date.to).add(12, "hour").format("MMM DD, YYYY h:mm A")}
                </>
              ) : (
                dayjs(date.from).add(14, "hour").format("MMM DD, YYYY h:mm A")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              handleNewDate(newDate);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
