import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { useCancelPendingBooking, useQueryBooking } from "@/hook/booking.hook";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PendingBooking, QueryManyInput } from "@/lib/data-type";
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

  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const { pendingBookings, getPendingBookings, loadingPB } = useQueryBooking();
  const [selectedPendingBooking, setSelectedPendingBooking] = useState<
    PendingBooking | undefined
  >();

  const { cancelPendingBooking } = useCancelPendingBooking();

  useEffect(() => {
    getPendingBookings(params);
  }, []);

  useEffect(() => {
    if (!displayModal) {
      setSelectedPendingBooking(undefined);
    }
  }, [displayModal]);

  return (
    <Card className="mb-6 p-4 flex flex-col max-h-[320px]">
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
        <tbody className="overflow-y-auto flex-1">
          {(loadingPB && "Loading...") ||
            pendingBookings?.map((booking: PendingBooking) => (
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
                      setSelectedPendingBooking(booking);
                      setDisplayModal(true);
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
                        getPendingBookings(params);
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
      </Table>
      {selectedPendingBooking && (
        <BookingModal
          booking={selectedPendingBooking}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
        />
      )}
    </Card>
  );
};

// const AlertErrorCancelBooking = () => {
//   return <></>;
// };
