import { useEffect, useState } from "react";
import { TermUnit } from "@/lib/contanst";
import { useSearchStore } from "@/store/search-store";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"; // ES 2015

export const usePlaceDateParsing = (reload: boolean) => {
  dayjs.extend(localizedFormat);
  const [parsedDate, setParsedDate] = useState<
    { start: any; end: any; date?: any; diff: any } | undefined
  >(undefined);
  const { term, selectedDate } = useSearchStore((state) => state);
  useEffect(() => {
    if (term == TermUnit.DAY) {
      setParsedDate({
        start: dayjs(selectedDate?.start).format("ll"),
        end: dayjs(selectedDate?.end).format("ll"),
        diff:
          dayjs(selectedDate?.end).diff(dayjs(selectedDate?.start), "day") + 1,
      });
    }
    if (term == TermUnit.HOUR) {
      setParsedDate({
        start: dayjs(selectedDate?.start).format("LT"),
        end: dayjs(selectedDate?.end).format("LT"),
        date: dayjs(selectedDate?.start).format("ll"),
        diff:
          dayjs(selectedDate?.end).diff(dayjs(selectedDate?.start), "hour") + 1,
      });
    }
  }, [reload]);
  return { parsedDate, term };
};
