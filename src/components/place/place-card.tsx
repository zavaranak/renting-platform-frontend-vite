import { useQuery } from "@apollo/client";
import useCreateBooking from "@/hook/create-booking-hook";
import { Place, PlaceAttribute } from "@/lib/data-type";
import { QUERY_PLACE_BY_ID } from "@/lib/gql/endpoint";
import { useEffect, useState } from "react";
import { CreateBookingBox } from "../boxes/create-booking-form";
import { useSearchStore } from "@/store/search-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface PlaceCardParam {
  id: string;
}

export const PlaceCard = (params: PlaceCardParam) => {
  const [place, setPlace] = useState<Place | null>();
  const [price, setPrice] = useState<PlaceAttribute | undefined>(undefined);
  const { createBooking } = useCreateBooking();
  const { term } = useSearchStore((state) => state);
  // const { data, loading, error, refetch } =
  useQuery(QUERY_PLACE_BY_ID, {
    variables: {
      type: "id",
      value: params.id,
    },
    onCompleted: (data) => {
      setPlace(data.getOnePlace);
      const priceAttributeName = "price_by_" + term;
      const price_attribute = data.getOnePlace.attributes?.find(
        (item: PlaceAttribute) => item.name === priceAttributeName.toUpperCase()
      );
      setPrice(price_attribute ?? undefined);
    },
  });
  useEffect(() => {
    if (place) {
      const priceAttributeName = "price_by_" + term;
      const price_attribute = place.attributes?.find(
        (item: PlaceAttribute) => item.name === priceAttributeName.toUpperCase()
      );
      setPrice(price_attribute ?? undefined);
    }
  }, [term]);

  return (
    <div className="bg-text_light_panel">
      {place && (
        <div className="bg-background_brown shadow-md rounded-lg overflow-hidden">
          <Card>
            <CardHeader>
              <CardTitle>{place.name}</CardTitle>
              <CardDescription>
                {place.address}, {place.city}, {place.country}
              </CardDescription>
            </CardHeader>
            {/* <CardContent> */}
            {place.photos && place.photos.length > 0 && (
              <img
                className="w-full h-48 object-cover"
                src={`/storage/places/${place.id}/${place.photos[0]}`}
                alt={place.name}
              />
            )}
            {/* </CardContent> */}
            <CardContent>
              <span className="mr-1">Term:</span>
              {place.termUnit && (
                <span className="mr-1">
                  {place.termUnit.map((unit) => unit).join(", ")}
                </span>
              )}
            </CardContent>
            <CardContent>
              <p>
                <span className="mr-1">Price by {term}:</span>
                <span>
                  {price
                    ? price.valueNumber + " " + price.value.toUpperCase()
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
            <CardFooter>
              {/* <p>Card Footer</p> */}
              <CreateBookingBox place={place} />
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
