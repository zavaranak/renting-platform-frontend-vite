import { useSearchStore } from "@store/search-store";
import { PlaceCard } from "@components/place/place-card";
import { FilterBox } from "./filter-box";
export default function SearchResultRoute() {
  const { result, location } = useSearchStore((state) => {
    console.log(state);
    return state;
  });

  return (
    <div className="flex flex-col col-span-full m-auto p-3 relative z-70 bg-background gap-4">
      <FilterBox />
      {result.length > 0 && (
        <div className="bg-text_light_panel ">
          <div className="flex p-3">
            <p className="capitalize">
              {location.city} ({location.country})
            </p>
            : {result.length}
            {"  "}
            accommodations options available
          </div>
        </div>
      )}
      {result.map((place) => (
        <PlaceCard key={place} id={place}></PlaceCard>
      ))}
    </div>
  );
}
