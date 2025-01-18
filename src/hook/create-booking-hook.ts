import { useMutation } from "@apollo/client";
import { BookingInput } from "@lib/data-type";
import { CREATE_BOOKING } from "@lib/gql/endpoint";
import { useAppStore } from "@store/app-store";
import { useAuthStore } from "@store/auth-store";
// import { useSearchStore } from "@store/search-store";
import { useState } from "react";
const useCreateBooking = () => {
  const { isAuthenticated, user } = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuthWaringForCreateBooking } = useAppStore((state) => state);
  const [mutationCreateBooking] = useMutation(CREATE_BOOKING, {
    onCompleted: (data) => {
      const { createBooking } = data;
      console.log(createBooking.booking.id);
      setLoading(false);
    },
    onError: (error) => {
      console.log(error);
      alert(error);
      setError(error.message);
      setLoading(false);
    },
  });

  const createBooking = async (params: BookingInput) => {
    if (isAuthenticated && user) {
      params.tenantId = user.id;
      setLoading(true);
      setError(null);
      await mutationCreateBooking({ variables: { BookingInput: params } });
    } else {
      setAuthWaringForCreateBooking(true);
    }
  };

  return { createBooking, loading, error };
};

export default useCreateBooking;
