import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchStore } from "@/store/search-store";
import HourSelector from "./hour-combobox";
import dayjs from "dayjs";
export function HourPicker() {
  const { setSelectedDate } = useSearchStore((state) => state);
  const [date, setDate] = useState<Date | undefined>(dayjs().toDate());
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const timeValueHandler = () => {
    const start = dayjs(date).add(parseInt(startHour), "hour").valueOf();
    const end = dayjs(date).add(parseInt(endHour), "hour").valueOf();
    if (start < end) {
      setSelectedDate({ start, end });
    } else {
      setEndHour("");
    }
  };
  useEffect(() => {
    timeValueHandler();
  }, [startHour, endHour, date]);
  useEffect(() => {
    setSelectedDate(undefined);
    // return () => {
    //   setSelectedDate(undefined);
    // };
  }, []);
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
