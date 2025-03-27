import { useEffect, useState } from "react";
import { TermUnit } from "@/lib/contanst";
import { useSearchStore } from "@/store/search-store";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"; // ES 2015
import { useQuery } from "@apollo/client";
import { Place, PlaceAttribute } from "@/lib/data-type";
import { QUERY_PLACE_BY_ID } from "@/lib/gql/endpoint";
import { CITIES, COUNTRIES } from "@/lib/gql/endpoint";

export const usePlaceDateParsing = (reload: boolean) => {
  dayjs.extend(localizedFormat);
  const [parsedDate, setParsedDate] = useState<
    { start: any; end: any; date?: any; diff: any } | undefined
  >(undefined);
  const { term, selectedDate } = useSearchStore((state) => state);
  useEffect(() => {
    if (term == TermUnit.DAY) {
      setParsedDate({
        start: dayjs(selectedDate?.start).format("ll"),
        end: dayjs(selectedDate?.end).format("ll"),
        diff:
          dayjs(selectedDate?.end).diff(dayjs(selectedDate?.start), "day") + 1,
      });
    }
    if (term == TermUnit.HOUR) {
      setParsedDate({
        start: dayjs(selectedDate?.start).format("LT"),
        end: dayjs(selectedDate?.end).format("LT"),
        date: dayjs(selectedDate?.start).format("ll"),
        diff:
          dayjs(selectedDate?.end).diff(dayjs(selectedDate?.start), "hour") + 1,
      });
    }
  }, [reload]);
  return { parsedDate, term };
};

export const usePlacePrice = (params: {
  id: string;
  parsedDate?: { start: any; end: any; date?: any; diff: any } | undefined;
}) => {
  const [price, setPrice] = useState<PlaceAttribute | undefined>(undefined);
  const [totalCharge, setTotalCharge] = useState(0);
  const { term } = useSearchStore((state) => state);
  const { place } = useQueryPlace(params.id);

  useQuery(QUERY_PLACE_BY_ID, {
    skip: !params.id,
    variables: {
      type: "id",
      value: params.id,
    },
    onCompleted: (data) => {
      console.log(data);
      const priceAttributeName = "PRICE_BY_" + term;
      const price_attribute = data.getOnePlace.attributes?.find(
        (item: PlaceAttribute) => item.name === priceAttributeName.toUpperCase()
      );
      setPrice(price_attribute ?? undefined);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    if (place) {
      const priceAttributeName = "PRICE_BY_" + term;
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

export const UseFetchCountriesAndCites = () => {
  const { location, countries, cities, setCountries, setCities } =
    useSearchStore((state) => state);
  useQuery(COUNTRIES, {
    skip: location.country != "" && countries.length > 0,
    onCompleted: (data) => {
      setCountries(data.getCountries.customData);
    },
  });
  useQuery(CITIES, {
    skip:
      location.country == "" ||
      !countries.includes(location.country) ||
      cities.length > 0,
    onCompleted: (data) => {
      setCities(data.getCitiesByCountryName.customData);
    },
    variables: {
      country_name: location.country,
    },
  });
};

export const useQueryPlace = (placeId: string) => {
  const [place, setPlace] = useState<Place | undefined>();
  const { loading } = useQuery(QUERY_PLACE_BY_ID, {
    variables: {
      type: "id",
      value: placeId,
    },
    onCompleted: (data) => {
      console.log(data);
      setPlace(data.getOnePlace);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { place, loading };
};
