import { useQuery } from "@apollo/client";
import { Place } from "@lib/data-type";
import { QUERY_PLACE_BY_ID } from "@lib/gql/endpoint";
import { useState } from "react";

interface PlaceCardParam {
  id: string;
}
export const PlaceCard = (params: PlaceCardParam) => {
  const [place, setPlace] = useState<Place | null>();
  useQuery(QUERY_PLACE_BY_ID, {
    variables: {
      type: "id",
      value: params.id,
    },
    onCompleted: (data) => {
      setPlace(data.getOnePlace);
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
          </div>
        </div>

        // <div className="p-3">
        //   <div className="flex capitalize gap-3">
        //     {place.name}
        //     <div>Rate: {place.rating}</div>
        //   </div>
        //   <div>
        //     <img
        //       src={`api/storage/places/${place.id}/${place.photos}`}
        //       alt="Loading image..."
        //     />
        //   </div>
        // </div>
      )}
    </div>
  );
};
