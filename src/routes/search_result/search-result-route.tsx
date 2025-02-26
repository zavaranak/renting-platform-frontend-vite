import { useSearchStore } from "@/store/search-store";
import { PlaceCard } from "@/components/place/place-card";
import { FilterBox } from "@/components/boxes/filter-box";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { SearchOption, PlaceType, TermUnit } from "@/lib/contanst";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"; // ES 2015
import { useSearchPlaces } from "@/hook/search-hook";

export default function SearchResultRoute() {
  dayjs.extend(localizedFormat);
  const {
    result,
    location,
    selectedDate,
    term,
    setType,
    setLocation,
    setTerm,
    setSelectedDate,
    handleSearch,
  } = useSearchStore((state) => state);
  const { searchPlaces, loading } = useSearchPlaces();
  const [parsedDate, setParsedDate] = useState<
    { start: any; end: any; date?: any; diff: any } | undefined
  >(undefined);
  const [firstLoad, setFirstLoad] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (result.length == 0 && location.city == "") {
      {
        const paramCity = searchParams.get("ci");
        const paramCountry = searchParams.get("co");
        const paramTerm = searchParams.get("t");
        const paramType = searchParams.get("ty");

        if (paramCity && paramCountry && paramTerm && paramType) {
          setTerm(paramTerm as TermUnit);
          setType(paramType as PlaceType);
          setLocation({ city: paramCity, country: paramCountry });

          if (paramTerm == TermUnit.DAY || paramTerm == TermUnit.HOUR) {
            const paramStart = searchParams.get("s");
            const paramEnd = searchParams.get("e");
            if (paramStart && paramEnd) {
              setSelectedDate({
                start: Number(paramStart),
                end: Number(paramEnd),
              });
              handleSearch({
                searchOption: SearchOption.LOCATION,
                valid: true,
              });
            }
          } else {
            handleSearch({ searchOption: SearchOption.LOCATION, valid: true });
          }
        }
      }
      setFirstLoad(true);
    }
  }, []);
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
  useEffect(() => {
    searchPlaces();
  }, [firstLoad]);
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
