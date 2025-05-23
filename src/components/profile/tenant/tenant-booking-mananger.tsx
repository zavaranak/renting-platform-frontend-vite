import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useFetchActiveBooking,
  useFetchCompletedBooking,
  useFetchPendingBooking,
  useHandlePendingBooking,
} from "@/hook/booking.hook";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  ActiveBooking,
  CompletedBooking,
  PendingBooking,
  QueryManyInput,
} from "@/lib/data-type";
import { Operator, TermUnit } from "@/lib/contanst";
import dayjs from "dayjs";
import BookingModal from "@/components/booking/booking.modal";

interface Props {
  tenantId: string;
}

export const TenantBookingManager = ({ tenantId }: Props) => {
  const [selectedBookingType, setBookingType] = useState<
    "Completed" | "Active" | "Pending" | undefined
  >(undefined);
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
    <div className="mb-6 flex flex-col gap-2">
      <Card className="p-4  flex flex-col max-h-[300px] overflow-y-scroll">
        <PendingBookingTable
          setType={setBookingType}
          queryParams={params}
          viewAction={setSelectedBooking}
        />
      </Card>
      <Card className=" p-4 flex flex-col max-h-[300px] overflow-y-scroll">
        <ActiveBookingTable
          setType={setBookingType}
          queryParams={params}
          viewAction={setSelectedBooking}
        />
      </Card>
      <Card className=" p-4 flex flex-col max-h-[300px] overflow-y-scroll">
        <CompletedBookingTable
          setType={setBookingType}
          queryParams={params}
          viewAction={setSelectedBooking}
        />
      </Card>

      {selectedBooking && (
        <BookingModal
          type={selectedBookingType}
          booking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
        />
      )}
    </div>
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
  setType: (x: "Completed" | "Active" | "Pending" | undefined) => void;
}

const PendingBookingTable = (tableParams: TableParam) => {
  const { queryParams, viewAction, setType } = tableParams;
  const { pendingBookings, getPendingBookings, loadingPB } =
    useFetchPendingBooking();
  const { cancelPendingBooking } = useHandlePendingBooking();

  useEffect(() => {
    getPendingBookings(queryParams);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending bookings</h2>
      <Table className="relative">
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead>Created</TableHead>

            <TableHead>Period</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Total charge</TableHead>
          </TableRow>
        </TableHeader>
        {loadingPB || (
          <TableBody className="overflow-y-auto flex-1">
            {pendingBookings?.map((booking: PendingBooking) => (
              <TableRow
                key={booking.id}
                className="hover:bg-gray-50 TableRowansition-colors"
              >
                <TableCell className="">
                  {dayjs(Number(booking.createdAt)).format("h:mm DD/MM/YYYY")}
                </TableCell>
                <TableCell className="">
                  {booking.period} {booking.termUnit?.toLowerCase()}
                  {booking.period > 1 ? "s" : ""}
                </TableCell>
                <TableCell className="">
                  {[TermUnit.DAY, TermUnit.HOUR].includes(booking.termUnit)
                    ? dayjs(Number(booking.startAt)).format("DD/MM/YYYY")
                    : "empty"}
                </TableCell>
                <TableCell className="">
                  {[TermUnit.DAY, TermUnit.HOUR].includes(booking.termUnit)
                    ? dayjs(Number(booking.endAt)).format("DD/MM/YYYY")
                    : "empty"}
                </TableCell>
                <TableCell className="">{booking.totalCharge} USD</TableCell>
                <TableCell className=" flex gap-2 m-auto">
                  <Button
                    onClick={() => {
                      setType("Pending");
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
                        alert("unable to cancel TableHeadis booking");
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

const ActiveBookingTable = (tableParams: TableParam) => {
  const { queryParams, viewAction, setType } = tableParams;
  const { activeBookings, getActiveBookings, loadingAB } =
    useFetchActiveBooking();

  const { cancelPendingBooking } = useHandlePendingBooking();

  useEffect(() => {
    getActiveBookings(queryParams);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Active bookings</h2>
      <Table className="relative">
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead>Created</TableHead>

            <TableHead>Period</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Total charge</TableHead>
          </TableRow>
        </TableHeader>
        {loadingAB || (
          <TableBody className="overflow-y-auto flex-1">
            {activeBookings?.map((booking: PendingBooking) => (
              <TableRow
                key={booking.id}
                className="hover:bg-gray-50 TableRowansition-colors"
              >
                <TableCell className="">
                  {dayjs(Number(booking.createdAt)).format("h:mm DD/MM/YYYY")}
                </TableCell>
                <TableCell className="">
                  {booking.period} {booking.termUnit?.toLowerCase()}
                  {booking.period > 1 ? "s" : ""}
                </TableCell>
                <TableCell className="">
                  {[TermUnit.DAY, TermUnit.HOUR].includes(booking.termUnit)
                    ? dayjs(Number(booking.startAt)).format("DD/MM/YYYY")
                    : "empty"}
                </TableCell>
                <TableCell className="">
                  {[TermUnit.DAY, TermUnit.HOUR].includes(booking.termUnit)
                    ? dayjs(Number(booking.endAt)).format("DD/MM/YYYY")
                    : "empty"}
                </TableCell>
                <TableCell className="">{booking.totalCharge} USD</TableCell>
                <TableCell className=" flex gap-2 m-auto">
                  <Button
                    onClick={() => {
                      setType("Active");
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
                        alert("unable to cancel TableHeadis booking");
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};
const CompletedBookingTable = (tableParams: TableParam) => {
  const { queryParams, viewAction, setType } = tableParams;
  const { completedBookings, getCompletedBookings, loadingCB } =
    useFetchCompletedBooking();

  useEffect(() => {
    getCompletedBookings(queryParams);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Completed bookings</h2>
      <Table className="relative">
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead>Created</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Total charge</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        {loadingCB || (
          <TableBody className="overflow-y-auto flex-1">
            {completedBookings?.map((booking: CompletedBooking) => (
              <TableRow
                key={booking.id}
                className="hover:bg-gray-50 TableRowansition-colors"
              >
                <TableCell className="">
                  {dayjs(Number(booking.createdAt)).format("h:mm DD/MM/YYYY")}
                </TableCell>
                <TableCell className="">
                  {booking.period} {booking.termUnit?.toLowerCase()}
                  {booking.period > 1 ? "s" : ""}
                </TableCell>
                <TableCell className="">
                  {[TermUnit.DAY, TermUnit.HOUR].includes(booking.termUnit)
                    ? dayjs(Number(booking.startAt)).format("DD/MM/YYYY")
                    : "empty"}
                </TableCell>
                <TableCell className="">
                  {[TermUnit.DAY, TermUnit.HOUR].includes(booking.termUnit)
                    ? dayjs(Number(booking.endAt)).format("DD/MM/YYYY")
                    : "empty"}
                </TableCell>
                <TableCell className="">{booking.totalCharge} USD</TableCell>
                <TableCell className="">
                  {booking.status.toLocaleLowerCase()}
                </TableCell>
                <TableCell className="">
                  <Button
                    onClick={() => {
                      setType("Completed");
                      viewAction(booking);
                    }}
                    variant="ghost"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};
