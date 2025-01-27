"use client";

import * as React from "react";
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
import { Input } from "@/components/ui/input";
import { SelectedDate } from "@/lib/data-type";

export function HourPicker() {
  const [hourValue, setHourValue] = React.useState<SelectedDate | undefined>(
    undefined
  );
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="grid grid-cols-5 gap-1">
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
      <Input type="time" value={hourValue?.start} />
      <Input type="time" value={hourValue?.end} />
    </div>
  );
}
