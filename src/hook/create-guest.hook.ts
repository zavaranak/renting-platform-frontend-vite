import { useMutation } from "@apollo/client";
import { Guest } from "@/lib/data-type";
import { CREATE_GUEST } from "@/lib/gql/endpoint";
import { useState } from "react";

const useCreateGuest = () => {
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

export default useCreateGuest;
