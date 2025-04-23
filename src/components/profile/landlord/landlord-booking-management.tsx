import BookingModal from "@/components/booking/booking.modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  useHandleActiveBooking,
  useHandlePendingBooking,
} from "@/hook/booking.hook";
import { Operator, TermUnit } from "@/lib/contanst";
import {
  ActiveBooking,
  CompletedBooking,
  PendingBooking,
  QueryManyInput,
} from "@/lib/data-type";
import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface LandlordBookingManagementParams {
  placesId: string[];
}

export const LandlordBookingManagement = ({
  placesId,
}: LandlordBookingManagementParams) => {
  const [queryParams, setQueryParams] = useState<QueryManyInput | undefined>(
    undefined
  );

  // const [selectedBookingType, setBookingType] = useState<
  //   "Completed" | "Active" | "Pending" | undefined
  // >(undefined);
  const setupQueryParams = (): boolean => {
    if (placesId.length > 0) {
      const value = placesId.reduce((prev, current, index, arr) => {
        const lastSymbol = index != arr.length - 1 ? "," : "";
        const newVal = prev + "'" + current + "'" + lastSymbol;
        return newVal;
      }, "");

      setQueryParams({
        conditions: [
          {
            key: "placeId",
            value: value,
            operator: Operator.IN,
          },
        ],
      });
      return true;
    } else return false;
  };

  useEffect(() => {
    setupQueryParams();
  }, [placesId]);

  return (
    <div>
      <Card className="p-2">
        <h2 className="text-xl font-bold mb-4">Booking management</h2>
        {queryParams && (
          <BookingTable
            queryParams={queryParams}
            // viewAction={setSelectedBooking}
          />
        )}
      </Card>
    </div>
  );
};

interface TableParams {
  queryParams: QueryManyInput;
  // setType: (x: "Completed" | "Active" | "Pending" | undefined) => void;
  // viewAction: (
  //   booking: PendingBooking | ActiveBooking | CompletedBooking
  // ) => void;
}
const BookingTable = (tableParams: TableParams) => {
  const { queryParams } = tableParams;
  const [refreshTrigger, refresh] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<
    PendingBooking | ActiveBooking | CompletedBooking | undefined
  >();
  const [currentType, setType] = useState<"Completed" | "Active" | "Pending">(
    "Pending"
  );
  const { pendingBookings, getPendingBookings, loadingPB } =
    useFetchPendingBooking();
  const { activeBookings, getActiveBookings, loadingAB } =
    useFetchActiveBooking();
  const { completedBookings, getCompletedBookings, loadingCB } =
    useFetchCompletedBooking();
  useEffect(() => {
    switch (currentType) {
      case "Pending": {
        if (queryParams) getPendingBookings(queryParams);
        break;
      }
      case "Active": {
        if (queryParams) getActiveBookings(queryParams);
        break;
      }
      case "Completed": {
        if (queryParams) getCompletedBookings(queryParams);
        break;
      }
    }
  }, [currentType, refreshTrigger]);

  const { cancelPendingBooking, acceptPendingBooking } =
    useHandlePendingBooking();

  const { completeActiveBooking, cancelActiveBooking } =
    useHandleActiveBooking();

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <Button
          className={clsx()}
          disabled={currentType == "Pending"}
          onClick={() => {
            setType("Pending");
          }}
        >
          Pending
        </Button>
        <Button
          className={clsx()}
          disabled={currentType == "Active"}
          onClick={() => {
            setType("Active");
          }}
        >
          Active
        </Button>
        <Button
          className={clsx()}
          disabled={currentType == "Completed"}
          onClick={() => {
            setType("Completed");
          }}
        >
          Completed
        </Button>
      </div>
      <Table className="relative">
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead>Created</TableHead>
            <TableHead>Periods</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Total charge</TableHead>
            {currentType == "Completed" && <TableHead>Status</TableHead>}
          </TableRow>
        </TableHeader>
        {currentType == "Pending" &&
          (loadingPB || (
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-black">
                        <div className="font-bold p-2 rounded-md bg-dark_brown text-text_light_panel">
                          Actions
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="pointer-events-none">
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(() => {
                                setType("Pending");
                                setSelectedBooking(booking);
                              }, 10);
                            }}
                            variant="default"
                            className="w-full justify-start"
                          >
                            View
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(async () => {
                                const result = await acceptPendingBooking(
                                  booking.id
                                );
                                if (result.activateBooking) {
                                  refresh((prev) => prev + 1);
                                }
                              }, 10);
                            }}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            Accept
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(async () => {
                                const result = await cancelPendingBooking(
                                  booking.id
                                );
                                if (result.cancelPendingBooking) {
                                  refresh((prev) => prev + 1);
                                }
                              }, 10);
                            }}
                            variant="destructive"
                            className="w-full justify-start"
                          >
                            Refuse
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ))}
        {currentType == "Active" &&
          (loadingAB || (
            <TableBody className="overflow-y-auto flex-1">
              {activeBookings?.map((booking: ActiveBooking) => (
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-black">
                        <div className="font-bold p-2 rounded-md bg-dark_brown text-text_light_panel">
                          Actions
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="pointer-events-none">
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(() => {
                                setType("Pending");
                                setSelectedBooking(booking);
                              }, 10);
                            }}
                            variant="default"
                            className="w-full justify-start"
                          >
                            View
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(async () => {
                                const result = await completeActiveBooking(
                                  booking.id
                                );
                                if (result.completeActiveBooking) {
                                  refresh((prev) => prev + 1);
                                }
                              }, 10);
                            }}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            Complete
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(async () => {
                                const result = await cancelActiveBooking(
                                  booking.id
                                );
                                if (result.cancelActiveBooking) {
                                  refresh((prev) => prev + 1);
                                }
                              }, 10);
                            }}
                            variant="destructive"
                            className="w-full justify-start"
                          >
                            Cancel
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ))}
        {currentType == "Completed" &&
          (loadingCB || (
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-black">
                        <div className="font-bold p-2 rounded-md bg-dark_brown text-text_light_panel">
                          Actions
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="pointer-events-none">
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(() => {
                                setType("Pending");
                                setSelectedBooking(booking);
                              }, 10);
                            }}
                            variant="default"
                            className="w-full justify-start"
                          >
                            View
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ))}
      </Table>
      {selectedBooking && (
        <BookingModal
          type={currentType}
          booking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
        />
      )}
    </div>
  );
};
