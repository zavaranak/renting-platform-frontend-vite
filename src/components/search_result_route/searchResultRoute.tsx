import { useSearchStore } from "@/store/search-store";
import { PlaceCard } from "@/components/place/place-card";
import { FilterBox } from "./filter-box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { TermUnit } from "@/lib/contanst";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"; // ES 2015
export default function SearchResultRoute() {
  dayjs.extend(localizedFormat);
  const navigate = useNavigate();
  const { result, location, selectedDate, term } = useSearchStore(
    (state) => state
  );
  const [parsedDate, setParsedDate] = useState<
    { start: any; end: any; date?: any; diff: any } | undefined
  >(undefined);
  useEffect(() => {
    if (!result || result.length == 0) {
      navigate("/");
    }
  }, [result]);
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
  }, []);
  return (
    <div className="flex flex-col col-span-full m-auto p-3 relative z-70 bg-background gap-4 lg:w-2/5 md:w-3/5 sm:w-ful">
      <FilterBox />
      {result.length > 0 && (
        <Card>
          <div className="flex p-3">
            <p className="capitalize">
              {location.city} ({location.country})
            </p>
            : {result.length}
            {"  "}
            accommodations options available{" "}
            {parsedDate && (
              <>
                from {parsedDate?.start} to {parsedDate?.end}
              </>
            )}
          </div>
        </Card>
      )}
      {result.map((place) => (
        <PlaceCard key={place} id={place} parsedDate={parsedDate}></PlaceCard>
      ))}
    </div>
  );
}
