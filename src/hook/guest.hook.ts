import { useMutation, useQuery } from "@apollo/client";
import { Guest, UpdateGuestParams } from "@/lib/data-type";
import {
  CREATE_GUEST,
  GET_ALL_GUESTS_BY_ID,
  UPDATE_GUEST,
} from "@/lib/gql/endpoint";
import { useState } from "react";

export const useCreateGuest = () => {
  const [loading, setLoading] = useState(false);
  const [newId, setId] = useState<string | null>(null); // string, not boolean
  const [error, setError] = useState<string | null>(null);

  const [mutationCreateGuest] = useMutation(CREATE_GUEST, {
    onCompleted: (data) => {
      const createdGuestId = data.createGuest?.guest?.id;
      if (createdGuestId) {
        setId(createdGuestId);
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error("GraphQL Error:", error);
      alert(error.message);
      setError(error.message);
      setLoading(false);
    },
  });

  const createGuest = async (params: Guest): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setId(null); // reset newId at the start

    const { id, ...rest } = params; // remove `id` if it's an optional field
    const guestInput = rest;

    try {
      const { data } = await mutationCreateGuest({
        variables: { input: guestInput },
      });
      const createdGuestId = data?.createGuest?.guest?.id;

      if (createdGuestId) {
        setId(createdGuestId);
        return createdGuestId; // <- this allows your frontend to directly use the new ID too
      }

      return null; // fallback if something weird happens
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  return { createGuest, newId, loading, error };
};

export const useUpdateGuest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [mutationUpdateGuest] = useMutation(UPDATE_GUEST, {
    onCompleted: (data) => {
      if (data.updateGuest.guest) {
        setResult(true);
      }
    },
    onError: (error) => {
      console.error("GraphQL Error:", error);
      alert(error.message);
      setError(error.message);
      setLoading(false);
    },
  });

  const updateGuest = async (
    params: UpdateGuestParams
  ): Promise<boolean | null> => {
    setLoading(true);
    setError(null);

    const { id, ...rest } = params;
    const updateParams = rest;

    try {
      const { data } = await mutationUpdateGuest({
        variables: { id: id, input: updateParams },
      });
      const createdGuestId = data?.createGuest?.guest?.id;

      if (createdGuestId) {
        return true; //
      }

      return null; // fallback if something weird happens
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  return { updateGuest, result, loading, error };
};

export const useFetchGuest = (userId: string) => {
  const [guestList, setGuestList] = useState<Guest[]>([]);

  const { refetch } = useQuery(GET_ALL_GUESTS_BY_ID, {
    variables: { type: "tenantId", value: userId },
    fetchPolicy: "cache-and-network", //"cache-first" for static data, "network-only", "no cache"
    onCompleted(data) {
      if (data.getGuests.guests) {
        setGuestList(data.getGuests.guests as Guest[]);
      }
    },
    onError(error) {
      console.log(error);
    },
  });
  return { guestList, setGuestList, refetch };
};
