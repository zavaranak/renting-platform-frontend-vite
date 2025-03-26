import { Card } from "@/components/ui/card";
import { Table } from "lucide-react";

export const BookingManager = () => {
  return (
    <Card className="mb-6 p-4">
      <h2 className="text-xl font-bold mb-4">Bookings</h2>
      <Table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* <tbody>
            {bookings?.map((booking: any) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.date}</td>
                <td>{booking.status}</td>
                <td>
                  <Button variant="ghost">View</Button>
                  <Button variant="ghost">Cancel</Button>
                </td>
              </tr>
            ))}
          </tbody> */}
      </Table>
    </Card>
  );
};
