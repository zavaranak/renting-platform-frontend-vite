import { useAppStore } from "@/store/app-store";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "@/store/search-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePlacePrice } from "@/hook/place.hook";
interface PlaceCardParam {
  id: string;
  parsedDate?: { start: any; end: any; date?: any; diff: any } | undefined;
}

export const PlaceCard = (params: PlaceCardParam) => {
  const { term, selectedDate, type } = useSearchStore((state) => state);
  const { setPlaceFromNavigation } = useAppStore((state) => state);
  const navigate = useNavigate();
  const handleClickOnPlaceCard = () => {
    setPlaceFromNavigation(place);
    navigate(
      `/place/${place?.id}?s=${selectedDate?.start}&e=${selectedDate?.end}&t=${term}&ty=${type}`
    );
  };
  const { totalCharge, place, price } = usePlacePrice(params);
  return (
    <div className="bg-text_light_panel ">
      {place && (
        <div className=" bg-background_brown shadow-md rounded-lg overflow-hidden">
          <Card
            onClick={handleClickOnPlaceCard}
            className="cursor-pointer grid grid-cols-2 "
          >
            <div className="col-span-1">
              <CardHeader>
                <CardTitle>{place.name}</CardTitle>
                <CardDescription>
                  {place.address}, {place.city}, {place.country}
                </CardDescription>
              </CardHeader>
              <div>
                <CardContent>
                  <p>
                    <span className="mr-1">Price:</span>

                    {params.parsedDate && (
                      <span>
                        {totalCharge} {price ? price.value.toUpperCase() : " "}{" "}
                        |{" "}
                      </span>
                    )}
                    <span>
                      {price
                        ? price.valueNumber +
                          " " +
                          price.value.toUpperCase() +
                          " per " +
                          term
                        : "currently not set"}
                    </span>
                  </p>
                </CardContent>
                <CardContent>
                  <span className="mr-1">Area:</span>
                  <span>{place.area} m²</span>
                </CardContent>
                <CardContent>
                  {place.distanceFromCenter !== undefined && (
                    <div className="flex items-center text-gray-700">
                      <span className="mr-1">Distance:</span>
                      <span>{place.distanceFromCenter} km from center</span>
                    </div>
                  )}
                </CardContent>

                <CardContent>
                  {place.rating !== undefined && (
                    <div className="flex items-center text-gray-700 mb-1">
                      <span className="mr-1">Rating:</span>
                      <span>{place.rating}</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter></CardFooter>
              </div>
            </div>
            <div>
              <CardContent className="h-full pt-9">
                {(place.photos && place.photos.length > 0 && (
                  <img
                    className="h-full object-corver"
                    src={`/storage/places/${place.id}/${place.photos[0]}`}
                    alt={place.name}
                  />
                )) || (
                  <img
                    className="h-full object-corver"
                    src={`/storage/places/default/place.webp`}
                    alt={place.name}
                  />
                )}
              </CardContent>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
