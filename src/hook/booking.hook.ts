import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ActiveBooking,
  BookingInput,
  CompletedBooking,
  PendingBooking,
  QueryManyInput,
} from "@/lib/data-type";
import {
  CANCEL_PENDING_BOOKING,
  CREATE_BOOKING,
  QUERY_ACTIVE_BOOKINGS,
  QUERY_COMPLETED_BOOKINGS,
  QUERY_PENDING_BOOKINGS,
} from "@/lib/gql/endpoint";
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

export const useFetchPendingBooking = () => {
  const [pendingBookings, setPendingBookings] = useState<
    PendingBooking[] | undefined
  >();
  const [loadingPB, setLoadingPB] = useState<boolean>(false);

  const [queryPendingBookings] = useLazyQuery(QUERY_PENDING_BOOKINGS, {
    fetchPolicy: "network-only",
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

export const useCancelPendingBooking = () => {
  const [cancelBooking] = useMutation(CANCEL_PENDING_BOOKING);

  const cancelPendingBooking = async (bookingId: string) => {
    try {
      await cancelBooking({
        variables: { pendingBookingId: bookingId },
      });
      return true; // Success
    } catch (err) {
      return false; // Failure
    }
  };

  return { cancelPendingBooking };
};

export const useFetchActiveBooking = () => {
  const [activeBookings, setActiveBookings] = useState<
    ActiveBooking[] | undefined
  >();
  const [loadingAB, setLoadingAB] = useState<boolean>(false);

  const [queryBookings] = useLazyQuery(QUERY_ACTIVE_BOOKINGS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log(data);
      setActiveBookings(data.getManyActiveBooking);
      setLoadingAB(false);
    },
    onError: (err) => {
      console.log(err);
      setLoadingAB(false);
    },
  });

  const getActiveBookings = async (params: QueryManyInput) => {
    setLoadingAB(true);
    await queryBookings({
      variables: {
        queryManyInput: params,
      },
    });
  };
  return { activeBookings, getActiveBookings, loadingAB };
};
export const useFetchCompletedBooking = () => {
  const [completedBookings, setCompletedBookings] = useState<
    CompletedBooking[] | undefined
  >();
  const [loadingCB, setLoadingCB] = useState<boolean>(false);

  const [queryBookings] = useLazyQuery(QUERY_COMPLETED_BOOKINGS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log(data);
      setCompletedBookings(data.getManyActiveBooking);
      setLoadingCB(false);
    },
    onError: (err) => {
      console.log(err);
      setLoadingCB(false);
    },
  });

  const getCompletedBookings = async (params: QueryManyInput) => {
    setLoadingCB(true);
    await queryBookings({
      variables: {
        queryManyInput: params,
      },
    });
  };
  return { completedBookings, getCompletedBookings, loadingCB };
};
