import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import {
  useCancelPendingBooking,
  useFetchActiveBooking,
  useFetchCompletedBooking,
  useFetchPendingBooking,
} from "@/hook/booking.hook";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  ActiveBooking,
  CompletedBooking,
  PendingBooking,
  QueryManyInput,
} from "@/lib/data-type";
import { Operator } from "@/lib/contanst";
import dayjs from "dayjs";
import BookingModal from "@/components/booking/booking.modal";

interface Props {
  tenantId: string;
}

export const TenantBookingManager = ({ tenantId }: Props) => {
  const params: QueryManyInput = {
    conditions: [
      {
        key: "tenantId",
        value: tenantId,
        operator: Operator.EQUAL,
      },
    ],
  };

  const [selectedBooking, setSelectedBooking] = useState<
    PendingBooking | ActiveBooking | CompletedBooking | undefined
  >();

  return (
    <Card className="mb-6 p-4 flex flex-col max-h-[620px]">
      <PendingBookingTable
        queryParams={params}
        viewAction={setSelectedBooking}
      />

      <ActiveBookingTable
        queryParams={params}
        viewAction={setSelectedBooking}
      />
      <CompletedBookingTable
        queryParams={params}
        viewAction={setSelectedBooking}
      />

      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
        />
      )}
    </Card>
  );
};

// const AlertErrorCancelBooking = () => {
//   return <></>;
// };

interface TableParam {
  queryParams: QueryManyInput;
  viewAction: (
    booking: PendingBooking | ActiveBooking | CompletedBooking
  ) => void;
}

const PendingBookingTable = (tableParams: TableParam) => {
  const { queryParams, viewAction } = tableParams;
  const { pendingBookings, getPendingBookings, loadingPB } =
    useFetchPendingBooking();
  const { cancelPendingBooking } = useCancelPendingBooking();

  useEffect(() => {
    getPendingBookings(queryParams);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending bookings</h2>
      <Table className="relative">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            <th>Created</th>
            <th>Term</th>
            <th>From</th>
            <th>To</th>
            <th>Total charge</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loadingPB || (
          <tbody className="overflow-y-auto flex-1">
            {pendingBookings?.map((booking: PendingBooking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  {dayjs(Number(booking.createdAt)).format("h:mm DD/MM/YYYY")}
                </td>
                <td className="px-4 py-3">{booking.termUnit?.toLowerCase()}</td>
                <td className="px-4 py-3">
                  {dayjs(Number(booking.startAt)).format("DD/MM/YYYY")}
                </td>
                <td className="px-4 py-3">
                  {dayjs(Number(booking.endAt)).format("DD/MM/YYYY")}
                </td>
                <td className="px-4 py-3">{booking.totalCharge}</td>
                <td className="px-4 py-3 flex gap-2 m-auto">
                  <Button
                    onClick={() => {
                      viewAction(booking);
                    }}
                    variant="ghost"
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      const actionResult = await cancelPendingBooking(
                        booking.id
                      );
                      if (actionResult) {
                        getPendingBookings(queryParams);
                      } else {
                        alert("unable to cancel this booking");
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  );
};

const ActiveBookingTable = (tableParams: TableParam) => {
  const { queryParams, viewAction } = tableParams;
  const { activeBookings, getActiveBookings, loadingAB } =
    useFetchActiveBooking();

  const { cancelPendingBooking } = useCancelPendingBooking();

  useEffect(() => {
    getActiveBookings(queryParams);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Active bookings</h2>
      <Table className="relative">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            <th>Created</th>
            <th>Term</th>
            <th>From</th>
            <th>To</th>
            <th>Total charge</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loadingAB || (
          <tbody className="overflow-y-auto flex-1">
            {activeBookings?.map((booking: PendingBooking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  {dayjs(Number(booking.createdAt)).format("h:mm DD/MM/YYYY")}
                </td>
                <td className="px-4 py-3">{booking.termUnit?.toLowerCase()}</td>
                <td className="px-4 py-3">
                  {dayjs(Number(booking.startAt)).format("DD/MM/YYYY")}
                </td>
                <td className="px-4 py-3">
                  {dayjs(Number(booking.endAt)).format("DD/MM/YYYY")}
                </td>
                <td className="px-4 py-3">{booking.totalCharge}</td>
                <td className="px-4 py-3 flex gap-2 m-auto">
                  <Button
                    onClick={() => {
                      viewAction(booking);
                    }}
                    variant="ghost"
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      const actionResult = await cancelPendingBooking(
                        booking.id
                      );
                      if (actionResult) {
                        getActiveBookings(queryParams);
                      } else {
                        alert("unable to cancel this booking");
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  );
};
const CompletedBookingTable = (tableParams: TableParam) => {
  const { queryParams, viewAction } = tableParams;
  const { completedBookings, getCompletedBookings, loadingCB } =
    useFetchCompletedBooking();

  useEffect(() => {
    getCompletedBookings(queryParams);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Completed bookings</h2>
      <Table className="relative">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            <th>Created</th>
            <th>Term</th>
            <th>From</th>
            <th>To</th>
            <th>Total charge</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loadingCB || (
          <tbody className="overflow-y-auto flex-1">
            {completedBookings?.map((booking: CompletedBooking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  {dayjs(Number(booking.createdAt)).format("h:mm DD/MM/YYYY")}
                </td>
                <td className="px-4 py-3">{booking.termUnit?.toLowerCase()}</td>
                <td className="px-4 py-3">
                  {dayjs(Number(booking.startAt)).format("DD/MM/YYYY")}
                </td>
                <td className="px-4 py-3">
                  {dayjs(Number(booking.endAt)).format("DD/MM/YYYY")}
                </td>
                <td className="px-4 py-3">{booking.totalCharge}</td>
                <td className="px-4 py-3">
                  <Button
                    onClick={() => {
                      viewAction(booking);
                    }}
                    variant="ghost"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  );
};
