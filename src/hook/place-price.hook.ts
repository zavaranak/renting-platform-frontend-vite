import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/search-store";
import { useQuery } from "@apollo/client";
import { Place, PlaceAttribute } from "@/lib/data-type";
import { QUERY_PLACE_BY_ID } from "@/lib/gql/endpoint";

export const usePlacePrice = (params: {
  id: string | undefined;
  parsedDate?: { start: any; end: any; date?: any; diff: any } | undefined;
}) => {
  const [place, setLocalStatePlace] = useState<Place | undefined>();
  const [price, setPrice] = useState<PlaceAttribute | undefined>(undefined);
  const [totalCharge, setTotalCharge] = useState(0);
  const { term } = useSearchStore((state) => state);
  // const { data, loading, error, refetch } =
  useQuery(QUERY_PLACE_BY_ID, {
    skip: !params.id,
    variables: {
      type: "id",
      value: params.id,
    },
    onCompleted: (data) => {
      setLocalStatePlace(data.getOnePlace);
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
      if (params.parsedDate && params.parsedDate?.diff) {
        const temp = price_attribute?.valueNumber ?? 1;
        setTotalCharge(temp * params.parsedDate?.diff);
      } else {
        setTotalCharge(price_attribute?.valueNumber ?? 0);
      }
    }
  }, [term, price]);

  return { totalCharge, place, price };
};
