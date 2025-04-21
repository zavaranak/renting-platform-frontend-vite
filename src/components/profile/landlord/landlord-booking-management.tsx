import { Button } from "@/components/ui/button";
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
import { useFetchPendingBooking } from "@/hook/booking.hook";
import { Operator } from "@/lib/contanst";
import { PendingBooking, QueryManyInput } from "@/lib/data-type";
import dayjs from "dayjs";
import { useEffect } from "react";

interface LandlordBookingManagementParams {
  placesId: string[];
}

export const LandlordBookingManagement = ({
  placesId,
}: LandlordBookingManagementParams) => {
  const setupQueryParams = (): QueryManyInput => {
    const value = placesId.reduce((prev, current, index, arr) => {
      const lastSymbol = index != arr.length - 1 ? "," : "";
      const newVal = prev + "'" + current + "'" + lastSymbol;
      return newVal;
    }, "");
    return {
      conditions: [
        {
          key: "placeId",
          value: value,
          operator: Operator.IN,
        },
      ],
    };
  };

  return (
    <div>
      {" "}
      <h2 className="text-xl font-bold mb-4">
        Booking management [from {placesId.length} places]
      </h2>
      <PendingBookingTable queryParams={setupQueryParams()} />
    </div>
  );
};

interface TableParams {
  queryParams: QueryManyInput;
}
const PendingBookingTable = (tableParams: TableParams) => {
  const { queryParams } = tableParams;
  const { pendingBookings, getPendingBookings, loadingPB } =
    useFetchPendingBooking();
  //   const { cancelPendingBooking } = useCancelPendingBooking();

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
            <TableHead>Term</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Total charge</TableHead>
            <TableHead>Actions</TableHead>
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
                  {booking.termUnit?.toLowerCase()}
                </TableCell>
                <TableCell className="">
                  {dayjs(Number(booking.startAt)).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="">
                  {dayjs(Number(booking.endAt)).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="">{booking.totalCharge}</TableCell>
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
                              //   setSelectedPlace(place);
                            }, 10);
                          }}
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          View
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          onClick={() => {
                            setTimeout(() => {
                              //   setUpdatePlace(place);
                            }, 10);
                          }}
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Update
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          onClick={() => {
                            setTimeout(() => {
                              //   setUpdateAttributes({
                              //     placeId: place.id,
                              //     placeName: place.name,
                              //     placeAddress:
                              //       place.address + `(` + place.city + ")",
                              //     attributes: place.attributes,
                              //   });
                            }, 10);
                          }}
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Manage
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};
