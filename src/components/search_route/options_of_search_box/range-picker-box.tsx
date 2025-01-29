import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useSearchStore } from "@/store/search-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { selectedDate, setSelectedDate } = useSearchStore((state) => state);
  const [date, setDate] = useState<DateRange | undefined>({
    from: dayjs().hour(14).minute(0).second(0).millisecond(0).toDate(),
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

        setSelectedDate({
          start: adjustedFrom.getTime(),
          end: adjustedTo.getTime(),
        });
        setDate(value);
      }
    } else {
      setSelectedDate(undefined);
      setDate(value);
    }
  };
  useEffect(() => {
    setSelectedDate(undefined);
    // return () => {
    //   setSelectedDate(undefined);
    // };
  }, []);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="text-xs">
        <span className="col-span-3">Date</span>
      </div>
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
                    .format("MMM DD, YYYY HH:mm")}{" "}
                  -{" "}
                  {dayjs(date.to).add(12, "hour").format("MMM DD, YYYY HH:mm")}
                </>
              ) : (
                dayjs(date.from).format("MMM DD, YYYY HH:mm")
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
