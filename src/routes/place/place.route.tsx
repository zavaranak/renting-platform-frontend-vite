import { Place } from "@/lib/data-type";
import { QUERY_PLACE_BY_ID } from "@/lib/gql/endpoint";
import { useAppStore } from "@/store/app-store";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookingForm } from "@/components/booking/booking-form";
import { usePlaceDateParsing } from "@/hook/place-date.hook";
import { usePlacePrice } from "@/hook/place-price.hook";
import { useParamsUrlHandler } from "@/hook/url.hook";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

export default function PlaceRoute() {
  const { isAuthenticated } = useAuthStore((state) => state);
  const { placeFromNavigation } = useAppStore((state) => state);
  const [place, setLocalStatePlace] = useState<Place | undefined>(
    placeFromNavigation
  );
  const { placeId } = useParams();

  const { firstLoad } = useParamsUrlHandler();
  const { parsedDate } = usePlaceDateParsing(firstLoad);
  const { totalCharge } = usePlacePrice({ id: placeId, parsedDate });
  // ✅ Call useQuery at the top level
  const { data, loading, error } = useQuery(QUERY_PLACE_BY_ID, {
    skip: !!placeFromNavigation || !placeId,
    variables: {
      type: "id",
      value: placeId,
    },
  });
  //fetch place by id if there is no place in store
  // ✅ Update local state only when new data is received
  useEffect(() => {
    if (!placeFromNavigation && data?.getOnePlace) {
      setLocalStatePlace(data.getOnePlace);
      console.log(data.getOnePlace);
    }
  }, [data, placeFromNavigation]);

  if (loading)
    return <div className="text-center py-10">Loading place details...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">Error loading place.</div>
    );
  if (!place) return <div className="text-center py-10">Place not found.</div>;

  return (
    <div className="col-span-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg pt-10">
      <div className="text-sm grid grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold mb-2">{place.name}</h1>
          <p className="text-gray-600">
            {place.address}, {place.city}, {place.country}
          </p>
          <p className="text-gray-700 mt-2">
            Area: <strong>{place.area} m²</strong>
          </p>
          <p className="text-gray-700">
            Status: <strong>{place.status}</strong>
          </p>
          <p className="text-gray-700">
            Rating: <strong>{place.rating}</strong>
          </p>
          <p className="text-gray-700">
            Landlord ID: <strong>{place.landlord.id}</strong>
          </p>

          {/* Pricing Attributes */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-1">Pricing</h3>
            {place.attributes &&
              place.attributes.map((attr) => (
                <p key={attr.id} className="text-gray-600">
                  {attr.name.replace("PRICE_BY_", "Price per ")}:{" "}
                  <strong>
                    {attr.valueNumber} {attr.value}
                  </strong>
                </p>
              ))}
          </div>

          {/* Term Units & Type */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Available For</h3>
            <p className="text-gray-700">{place.termUnit.join(", ")}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Property Type</h3>
            <p className="text-gray-700">{place.type.join(", ")}</p>
          </div>

          {/* Additional Details */}
          <div className="mt-4">
            <p className="text-gray-600">
              Distance from center:{" "}
              <strong>{place.distanceFromCenter} km</strong>
            </p>
            <p className="text-gray-600">
              Created At:{" "}
              <strong>{new Date(place.createdAt).toLocaleString()}</strong>
            </p>
            <p className="text-gray-600">
              Last Updated:{" "}
              <strong>{new Date(place.lastUpdate).toLocaleString()}</strong>
            </p>
          </div>

          <div className="mt-4">
            {isAuthenticated || (
              <div>
                <Button>Please login to create booking</Button>
              </div>
            )}
            {isAuthenticated && (
              <BookingForm
                place={place}
                parsedDate={parsedDate}
                totalCharge={totalCharge}
              />
            )}
          </div>
        </div>
        <div>
          {(place.photos && place.photos.length > 0 && (
            <Carousel className="m-10">
              <CarouselContent>
                {place.photos.map((url) => (
                  <CarouselItem key={url}>
                    {" "}
                    <img
                      className="h-full object-corver"
                      src={`/storage/places/${place.id}/${url}`}
                      alt={place.name}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )) || (
            <img
              className="h-5/6 object-corver"
              src={`/storage/places/default/place.webp`}
              alt={place.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}
