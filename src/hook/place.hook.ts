import { useCallback, useEffect, useState } from "react";
import { Operator, TermUnit } from "@/lib/contanst";
import { useSearchStore } from "@/store/search-store";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"; // ES 2015
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Place,
  PlaceAttribute,
  PlaceAttributeCreate,
  PlaceAttributeUpdate,
  PlaceInput,
  PlaceUpdateInput,
} from "@/lib/data-type";
import {
  ADD_PLACE_ATTRIBUTES,
  CREATE_PLACE,
  QUERY_PLACE_BY_ID,
  QUERY_PLACES_WITH_DATA,
  REMOVE_PLACE_ATTRIBUTES,
  UPDATE_PLACE,
  UPDATE_PLACE_ATTRIBUTES,
  UPDATE_PLACE_PHOTOS,
} from "@/lib/gql/endpoint";
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

export const useFetchCountriesAndCites = () => {
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

export const useQueryPlacesByLandlord = (landlordId: string) => {
  const [places, setPlaces] = useState<Place[]>();
  const [search, { loading, error }] = useLazyQuery(QUERY_PLACES_WITH_DATA, {
    onCompleted: (data) => {
      setPlaces(data?.getPlaces ?? []);
      console.log(data?.getPlaces);
    },
    onError: (error) => {
      console.error("Fetch error:", error);
    },
  });

  const queryPlacesByLandlord = useCallback(() => {
    search({
      fetchPolicy: "network-only",
      variables: {
        queryManyInput: {
          conditions: [
            {
              value: landlordId,
              key: "landlordId",
              operator: Operator.EQUAL,
            },
          ],
        },
      },
    });
  }, [search]);

  return {
    queryPlacesByLandlord,
    places: places ?? [],
    loading,
    error,
  };
};

export const useCreatePlace = () => {
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [create] = useMutation(CREATE_PLACE, {
    onCompleted: (data) => {
      console.log(data.createPlace);
      setLoading(false);
      setResult(true);
    },
    onError: (err) => {
      console.log(err);
      setLoading(false);
      setResult(false);
    },
  });
  const createPlace = useCallback(
    async (input: PlaceInput): Promise<{ success: boolean }> => {
      setLoading(true);
      setError(null);

      try {
        input.area = Number(input.area);
        input.distanceFromCenter = Number(input.distanceFromCenter);
        const { data } = await create({
          variables: { placeInput: input },
        });

        const success = Boolean(data?.createPlace);
        setResult(success);
        return { success };
      } catch (err) {
        console.error("Mutation error:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setResult(false);
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [create]
  );
  return { createPlace, result, loading, error };
};

export const useUpdatePlace = () => {
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [update] = useMutation(UPDATE_PLACE, {
    onCompleted: (data) => {
      console.log(data.placeUpdateInput);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const updatePlace = useCallback(
    async (input: PlaceUpdateInput): Promise<{ success: boolean }> => {
      setLoading(true);
      setError(null);

      try {
        input.area = Number(input.area);
        input.distanceFromCenter = Number(input.distanceFromCenter);
        const { data } = await update({
          variables: { placeUpdateInput: input },
        });

        const success = Boolean(data?.updatePlace);
        setResult(success);
        return { success };
      } catch (err) {
        console.error("Mutation error:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setResult(false);
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [update]
  );
  return { updatePlace, loading, result, error };
};

interface StatusAttributeAction {
  result: boolean;
  loading: boolean;
}
export const usePlaceAttributes = () => {
  const [statusCreate, setStatusCreate] = useState<StatusAttributeAction>({
    result: false,
    loading: false,
  });
  const [statusUpdate, setStatusUpdate] = useState<StatusAttributeAction>({
    result: false,
    loading: false,
  });
  const [statusRemove, setStatusRemove] = useState<StatusAttributeAction>({
    result: false,
    loading: false,
  });
  const [create] = useMutation(ADD_PLACE_ATTRIBUTES);
  const [update] = useMutation(UPDATE_PLACE_ATTRIBUTES);
  const [remove] = useMutation(REMOVE_PLACE_ATTRIBUTES);
  const createAttrs = useCallback(
    async (input: PlaceAttributeCreate[], placeId: string) => {
      setStatusCreate({
        result: false,
        loading: true,
      });
      const { data } = await create({
        variables: {
          placeId: placeId,
          placeAttributeInput: input,
        },
      });
      const success = Boolean(data?.addPlaceAttributes);
      setStatusCreate({ loading: false, result: success });
      return success;
    },
    [create]
  );
  const updateAttrs = useCallback(
    async (input: PlaceAttributeUpdate[]) => {
      setStatusUpdate({
        result: false,
        loading: true,
      });
      const { data } = await update({
        variables: {
          attibuteUpdateInput: input,
        },
      });
      const success = Boolean(data?.updatePlaceAttributes);
      setStatusUpdate({ loading: false, result: success });
      return success;
    },
    [update]
  );

  const removeAttrs = useCallback(
    async (input: string[]) => {
      setStatusRemove({
        loading: true,
        result: false,
      });
      const { data } = await remove({
        variables: {
          attributeIds: input,
        },
      });
      const success = Boolean(data?.removePlaceAttributes);
      setStatusRemove({ loading: false, result: success });
      return success;
    },
    [remove]
  );

  return {
    createAttrs,
    updateAttrs,
    removeAttrs,
    statusCreate,
    statusUpdate,
    statusRemove,
  };
};

export const useUpdatePlacePhotos = () => {
  const [uploadPhotoLoading, setLoading] = useState(false);
  const [uploadP] = useMutation(UPDATE_PLACE_PHOTOS, {
    context: {
      headers: {
        "apollo-require-preflight": true,
      },
    },
  });
  const [deleteP] = useMutation(UPDATE_PLACE);
  const uploadPhotos = useCallback(
    async (placeId: string, uploadedPhotos: File[], afterDeleted: string[]) => {
      console.log("upload photos", uploadedPhotos);
      console.log("after deleted", afterDeleted);
      setLoading(true);
      if (afterDeleted.length > 0) {
        await deleteP({
          variables: {
            placeUpdateInput: {
              id: placeId,
              photos: afterDeleted,
            },
          },
        });
      }
      if (uploadedPhotos.length > 0) {
        const { data, errors } = await uploadP({
          variables: {
            uploadPlacePhotosPlaceId: placeId,
            images: uploadedPhotos,
          },
        });

        if (errors) throw new Error(errors[0].message);
        return data;
      }
      setLoading(false);
      return true;
    },
    [uploadP, deleteP]
  );
  return { uploadPhotos, uploadPhotoLoading };
};
