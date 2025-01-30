import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingInput, Place } from "@/lib/data-type";
import { useSearchStore } from "@/store/search-store";
import { useAuthStore } from "@/store/auth-store";
import useCreateBooking from "@/hook/create-booking-hook";

interface CreateBookingBoxProps {
  place: Place;
}
export function CreateBookingBox(createBookingBoxProps: CreateBookingBoxProps) {
  const { place } = createBookingBoxProps;
  const { user } = useAuthStore((state) => state);
  const { term, selectedDate } = useSearchStore((state) => state);
  const { createBooking } = useCreateBooking();
  const createBookingHandler = () => {
    if (term) {
      const bookingInput: BookingInput = {
        placeId: place.id,
        tenantId: user?.id,
        startAt: selectedDate?.start,
        endAt: selectedDate?.end,
        period: 10,
        termUnit: term,
        totalCharge: 100,
      };
      createBooking(bookingInput);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Book</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Booking: "{place.name}"</AlertDialogTitle>
          <AlertDialogDescription>
            After creating a booking, you will be able to see the booking
            details.\n Please wait for the host to confirm your booking.
          </AlertDialogDescription>
          <Card>
            <CardHeader>
              <CardTitle>Client: {user?.username}</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Booking from _ to _</p>
            </CardContent>
            <CardFooter>
              <p>Total charge</p>
            </CardFooter>
            <CardFooter>
              <p>Total charge</p>
            </CardFooter>
          </Card>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              console.log("created booking for ", place.name);
              createBookingHandler();
            }}
          >
            Create Booking
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
