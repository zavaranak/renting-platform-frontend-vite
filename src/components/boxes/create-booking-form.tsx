import { useState } from "react";
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
import ClientInfoForm from "./client-info-form";
import { TermUnit } from "@/lib/contanst";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"; // Import the Drawer component

interface CreateBookingBoxProps {
  place: Place;
  parsedDate?: { start: any; end: any; date?: any; diff: any } | undefined;
  totalCharge?: number;
}

export function CreateBookingBox(createBookingBoxProps: CreateBookingBoxProps) {
  const { place, parsedDate, totalCharge } = createBookingBoxProps;
  const { user } = useAuthStore((state) => state);
  const { term, selectedDate } = useSearchStore((state) => state);
  const { createBooking } = useCreateBooking();

  // State to manage guest info list and drawer visibility
  const [showGuestInfoDrawer, setShowGuestInfoDrawer] = useState(false);
  const [guestList, setGuestList] = useState<Array<any>>([]); // Replace `any` with your guest info type

  const createBookingHandler = () => {
    const bookingInput: BookingInput = {
      placeId: place.id,
      tenantId: user?.id,
      startAt: selectedDate?.start,
      endAt: selectedDate?.end,
      period: parsedDate?.diff,
      termUnit: term.toUpperCase(),
      totalCharge: 100,
    };
    createBooking(bookingInput);
  };

  // Handler to add guest info
  const handleAddGuestInfo = (guestInfo: any) => {
    setGuestList([...guestList, guestInfo]);
    setShowGuestInfoDrawer(false); // Close the drawer after submission
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Book</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking: "{place.name}"</AlertDialogTitle>
            <AlertDialogDescription>
              After creating a booking, you will be able to see the booking
              details. Please wait for the host to confirm your booking.
            </AlertDialogDescription>
            <Card>
              <CardHeader>
                <CardTitle>Client: {user?.username}</CardTitle>
                <Button
                  variant={"outline"}
                  onClick={() => setShowGuestInfoDrawer(true)}
                >
                  {guestList.length > 0
                    ? "Select guest info"
                    : "Fill guest info"}
                </Button>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>

              {/* Display guest info list */}
              {guestList.length > 0 && (
                <CardContent>
                  <h3 className="font-semibold mb-2">Guest List</h3>
                  <ul>
                    {guestList.map((guest, index) => (
                      <li key={index}>{guest.name}</li> // Replace with your guest info structure
                    ))}
                  </ul>
                </CardContent>
              )}

              {parsedDate && term == TermUnit.DAY && (
                <CardContent>
                  <p>
                    Booking from {parsedDate.start} to {parsedDate?.end} (
                    {parsedDate.diff} nights)
                  </p>
                </CardContent>
              )}
              {parsedDate && term == TermUnit.HOUR && (
                <CardContent>
                  <p>
                    Booking from {parsedDate.start} to {parsedDate?.end} (
                    {parsedDate.diff} hours)
                  </p>
                  <p>on {parsedDate?.date}</p>
                </CardContent>
              )}

              <CardFooter>
                <p>Total charge: {totalCharge}</p>
              </CardFooter>
            </Card>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                createBookingHandler();
              }}
            >
              Create Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Drawer for Guest Info Form */}
      <Drawer open={showGuestInfoDrawer} onOpenChange={setShowGuestInfoDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Fill Guest Information</DrawerTitle>
            <DrawerDescription>
              Please provide the guest information.
            </DrawerDescription>
          </DrawerHeader>
          <ClientInfoForm onSubmit={handleAddGuestInfo} />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
