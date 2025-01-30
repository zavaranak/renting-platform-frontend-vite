import { useSearchStore } from "@/store/search-store";
import { PlaceCard } from "@/components/place/place-card";
import { FilterBox } from "./filter-box";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

export default function SearchResultRoute() {
  const navigate = useNavigate();
  const { result, location } = useSearchStore((state) => state);
  useEffect(() => {
    if (!result || result.length == 0) {
      navigate("/");
    }
  }, [result]);
  // const { authWarningForCreateBooking, setAuthWaringForCreateBooking } =
  //   useAppStore((state) => state);
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
            accommodations options available
          </div>
        </Card>
      )}
      {result.map((place) => (
        <PlaceCard key={place} id={place}></PlaceCard>
      ))}
    </div>
  );
}
