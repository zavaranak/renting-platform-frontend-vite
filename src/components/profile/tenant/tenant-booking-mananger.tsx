import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { useQueryBooking } from "@/hook/booking.hook";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { PendingBooking, QueryManyInput } from "@/lib/data-type";
import { Operator } from "@/lib/contanst";
import dayjs from "dayjs";

interface Props {
  tenantId: string;
}

export const TenantBookingManager = ({ tenantId }: Props) => {
  const { pendingBookings, getPendingBookings, loadingPB } = useQueryBooking();
  useEffect(() => {
    const params: QueryManyInput = {
      conditions: [
        {
          key: "tenantId",
          value: tenantId,
          operator: Operator.EQUAL,
        },
      ],
    };
    getPendingBookings(params);
  }, []);
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
            pendingBookings?.map((booking: Partial<PendingBooking>) => (
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
                  <Button variant="ghost">View</Button>
                  <Button variant="ghost">Cancel</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Card>
  );
};
