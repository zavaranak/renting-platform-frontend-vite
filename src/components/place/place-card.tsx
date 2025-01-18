import { useQuery } from "@apollo/client";
import Popup from "@components/boxes/popup-box";
import useCreateBooking from "@hook/create-booking-hook";
import { Place, PlaceAttribute } from "@lib/data-type";
import { QUERY_PLACE_BY_ID } from "@lib/gql/endpoint";
import { useSearchStore } from "@store/search-store";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers-pro";
interface PlaceCardParam {
  id: string;
}

export const PlaceCard = (params: PlaceCardParam) => {
  const { term } = useSearchStore((state) => state);
  const [place, setPlace] = useState<Place | null>();
  const [price, setPrice] = useState({} as PlaceAttribute);
  const [displayPopup, setDisplayPopup] = useState(false);
  const { createBooking } = useCreateBooking();
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
      setPrice(price_attribute ?? {});
    },
  });
  return (
    <div className="bg-text_light_panel">
      {place && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {place.photos && place.photos.length > 0 && (
            <img
              className="w-full h-48 object-cover"
              src={`/storage/places/${place.id}/${place.photos[0]}`}
              alt={place.name}
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {place.name}
            </h2>
            <p className="text-gray-600 mb-1">
              {place.address}, {place.city}, {place.country}
            </p>
            <div className="flex items-center text-gray-700 mb-1">
              <span className="mr-1">Type:</span>
              {place.type && (
                <span className="mr-1">
                  {place.type.map((type) => type).join(", ")}
                </span>
              )}
            </div>
            <div className="flex items-center text-gray-700 mb-1">
              <span className="mr-1">Term:</span>
              {place.termUnit && (
                <span className="mr-1">
                  {place.termUnit.map((unit) => unit).join(", ")}
                </span>
              )}
            </div>

            <div className="flex items-center text-gray-700 mb-1">
              <span className="mr-1">Area:</span>
              <span>{place.area} m²</span>
            </div>

            {place.rating !== undefined && (
              <div className="flex items-center text-gray-700 mb-1">
                <span className="mr-1">Rating:</span>
                <span>{place.rating}</span>
              </div>
            )}
            {place.distanceFromCenter !== undefined && (
              <div className="flex items-center text-gray-700">
                <span className="mr-1">Distance:</span>
                <span>{place.distanceFromCenter} km from center</span>
              </div>
            )}
            <div className="flex items-center text-gray-700 mb-1">
              <span className="mr-1">Status:</span>
              <span>{place.status}</span>
            </div>
            <div className="flex items-center text-gray-700 mb-1">
              <span className="mr-1">Price by {term}:</span>
              <span>
                {price.valueNumber
                  ? price.valueNumber + " " + price.value.toUpperCase()
                  : "currently not set"}
              </span>
            </div>
            <div
              className="flex justify-center border-2"
              onClick={() => setDisplayPopup(true)}
            >
              Create booking
            </div>
          </div>
        </div>
      )}
      <Popup
        title="create booking"
        isOpen={displayPopup}
        onClose={() => setDisplayPopup(false)}
      >
        <div></div>
        {/* <DatePicker label="From" />
        <DatePicker label="To" /> */}
      </Popup>
    </div>
  );
};
