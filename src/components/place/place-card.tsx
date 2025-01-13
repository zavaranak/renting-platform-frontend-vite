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
        <div className="p-3">
          <div className="flex capitalize gap-3">
            {place.name}
            <div>Rate: {place.rating}</div>
          </div>
          <div>
            <img
              src={`api/storage/places/${place.id}/${place.photos}`}
              alt="Loading image..."
            />
          </div>
        </div>
      )}
    </div>
  );
};
