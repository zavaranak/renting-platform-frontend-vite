import { useSearchStore } from "@/store/search-store";
import { PlaceCard } from "@/components/place/place-card";
import { FilterBox } from "@/components/boxes/filter-box";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useSearchPlaces } from "@/hook/search.hook";
import { usePlaceDateParsing } from "@/hook/place-date-parsing.hook";
import { useParamsUrlHandler } from "@/hook/params-url-handler.hook";

export default function SearchResultRoute() {
  const { result, location } = useSearchStore((state) => state);

  const { searchPlaces, loading } = useSearchPlaces();
  const { firstLoad } = useParamsUrlHandler();
  const { parsedDate } = usePlaceDateParsing(firstLoad);
  useEffect(() => {
    searchPlaces();
  }, [firstLoad]);

  if (loading) {
    return (
      <div className="flex flex-col col-span-full m-auto p-3 relative z-70 bg-background gap-4 lg:w-2/5 md:w-3/5 sm:w-ful">
        Loading result..
      </div>
    );
  }

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
