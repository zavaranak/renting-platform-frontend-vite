import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingInput, Place } from "@/lib/data-type";
import { useSearchStore } from "@/store/search-store";
import { useAuthStore } from "@/store/auth-store";
import { useCreateBooking } from "@/hook/booking.hook";
import { Payment, TermUnit } from "@/lib/contanst";
import { useState } from "react";
import GuestManager from "@/components/booking/guest/guest-manager";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

interface BookingFormProps {
  place: Place;
  parsedDate?: { start: any; end: any; date?: any; diff: any } | undefined;
  totalCharge?: number;
}

export function CreateBookingForm(createBookingBoxProps: BookingFormProps) {
  const { place, parsedDate, totalCharge } = createBookingBoxProps;
  const { user } = useAuthStore((state) => state);
  const { term, selectedDate } = useSearchStore((state) => state);
  const { createBooking } = useCreateBooking();
  const [payment, setPayment] = useState(Payment.CASH);
  const [guests, setGuests] = useState<string[]>([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [period, setPeriod] = useState("0");
  const navigate = useNavigate();
  const createBookingHandler = async (
    totalCharge: number,
    payment: string,
    guests: string[]
  ) => {
    if (term != undefined) {
      const bookingInput: BookingInput = {
        placeId: place.id,
        tenantId: user?.id,
        startAt: selectedDate?.start,
        endAt: selectedDate?.end,
        period: parsedDate?.diff ?? Number(period),
        termUnit: term.toUpperCase(),
        guests: guests,
        payment: payment,
        totalCharge: totalCharge,
      };
      await createBooking(bookingInput);
    }
  };

  return (
    <>
      <AlertDialog open={displayForm} onOpenChange={setDisplayForm}>
        <AlertDialogTrigger asChild>
          <Button
            className="p-3"
            variant="outline"
            onClick={() => setDisplayForm(true)}
          >
            Create Booking
          </Button>
        </AlertDialogTrigger>
        {displayForm && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Booking: "{place.name}"</AlertDialogTitle>
              <AlertDialogDescription>
                After creating a booking, you will be able to see the booking
                details. Please wait for the host to confirm your booking.
              </AlertDialogDescription>
              <Card>
                <div>
                  <CardHeader>
                    <CardTitle>Client: {user?.username}</CardTitle>
                    <GuestManager setGuests={setGuests} />
                  </CardHeader>
                </div>
                {/* Display guest info list */}

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
                {(term && [TermUnit.MONTH, TermUnit.WEEK].includes(term) && (
                  <>
                    <CardContent className="flex gap-5">
                      <p>Period:</p>
                      <Input
                        className="w-14"
                        type="number"
                        min={1}
                        onChange={(e) => setPeriod(e.target.value)}
                      />
                      <p>
                        {term?.toLowerCase()}
                        {Number(period) > 1 ? "s" : ""}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <p>
                        Total charge:{" "}
                        {Number(Number(period) * (totalCharge ?? 1))} USD
                      </p>
                    </CardFooter>
                  </>
                )) || (
                  <>
                    <CardFooter>
                      <p>Total charge: {totalCharge} USD</p>
                    </CardFooter>
                  </>
                )}

                <CardFooter>
                  <div className="flex">
                    <Label htmlFor="payment">Payment method</Label>
                    <Select
                      onValueChange={(value) => {
                        setPayment(value as Payment);
                      }}
                      value={payment}
                    >
                      <SelectTrigger id="payment">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Payment.CARD}>By card</SelectItem>
                        <SelectItem value={Payment.CASH}>
                          By cash on place
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardFooter>
              </Card>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDisplayForm(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await createBookingHandler(
                    term && [TermUnit.MONTH, TermUnit.WEEK].includes(term)
                      ? (totalCharge ?? 1) * Number(period) || 0
                      : totalCharge ?? 0,
                    payment,
                    guests || []
                  );
                  setDisplayForm(false);
                  navigate(`/profile/${user?.role}/${user?.id}`);
                }}
              >
                Create Booking
              </AlertDialogAction>
            </AlertDialogFooter>
            {/* </div> */}
          </AlertDialogContent>
        )}
      </AlertDialog>
    </>
  );
}
