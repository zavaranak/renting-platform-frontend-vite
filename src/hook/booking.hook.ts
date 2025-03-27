import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { BookingInput, PendingBooking, QueryManyInput } from "@/lib/data-type";
import { CREATE_BOOKING, QUERY_PENDING_BOOKINGS } from "@/lib/gql/endpoint";
import { useAppStore } from "@/store/app-store";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";

export const useCreateBooking = () => {
  const { isAuthenticated, user } = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuthWaringForCreateBooking } = useAppStore((state) => state);
  const [mutationCreateBooking] = useMutation(CREATE_BOOKING, {
    onCompleted: (data) => {
      const { createBooking } = data;
      console.log(createBooking.pendingBooking.id);
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
      await mutationCreateBooking({ variables: { bookingInput: params } });
    } else {
      setAuthWaringForCreateBooking(true);
    }
  };

  return { createBooking, loading, error };
};

export const useQueryBooking = () => {
  const [pendingBookings, setPendingBookings] = useState<
    Partial<PendingBooking>[] | undefined
  >();
  const [loadingPB, setLoadingPB] = useState<boolean>(false);

  const [queryPendingBookings] = useLazyQuery(QUERY_PENDING_BOOKINGS, {
    onCompleted: (data) => {
      console.log(data);
      setPendingBookings(data.getManyPendingBooking);
      setLoadingPB(false);
    },
    onError: (err) => {
      console.log(err);
      setLoadingPB(false);
    },
  });

  const getPendingBookings = async (params: QueryManyInput) => {
    setLoadingPB(true);
    await queryPendingBookings({
      variables: {
        queryManyInput: params,
      },
    });
  };
  return { pendingBookings, getPendingBookings, loadingPB };
};
