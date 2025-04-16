import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ActiveBooking,
  BookingInput,
  CompletedBooking,
  PendingBooking,
} from "@/lib/data-type";
import { DialogDescription } from "@radix-ui/react-dialog";
// import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useQueryPlace } from "@/hook/place.hook";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { isPendingBooking } from "@/lib/validation";

export interface BookingModalPros {
  booking: PendingBooking | ActiveBooking | CompletedBooking | undefined;
  setSelectedBooking: (x: PendingBooking | undefined) => void;
}
export default function BookingModal({
  booking,
  setSelectedBooking,
}: BookingModalPros) {
  if (booking != undefined && isPendingBooking(booking)) {
    const { place } = useQueryPlace(booking.placeId);
    dayjs.extend(localizedFormat);

    return (
      <Dialog
        open={booking != undefined}
        onOpenChange={() => setSelectedBooking(undefined)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Pending Booking</DialogTitle>
            <DialogDescription>
              Your booking is now pending. Please wait for landlord's reponse.
            </DialogDescription>
          </DialogHeader>
          {place && (
            <Card>
              <CardHeader>
                <p className="font-bold">{place.name}</p>
                <p>
                  {place?.address}, {place.city}, {place.country}
                </p>
              </CardHeader>
              <CardContent>{booking.guests}</CardContent>
              <CardContent>Total charge: {booking.totalCharge}</CardContent>
              <CardContent>
                Booking was created at:{" "}
                {dayjs(booking.createdAt).format("LLLL")}
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    );
  }
}
