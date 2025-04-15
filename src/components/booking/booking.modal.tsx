import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PendingBooking } from "@/lib/data-type";
import { DialogDescription } from "@radix-ui/react-dialog";
// import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useQueryPlace } from "@/hook/place.hook";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

export interface BookingModalPros {
  booking: PendingBooking;
  displayModal: boolean;
  setDisplayModal: (x: boolean) => void;
}
export default function BookingModal({
  booking,
  displayModal,
  setDisplayModal,
}: BookingModalPros) {
  const { place } = useQueryPlace(booking.placeId);
  dayjs.extend(localizedFormat);

  return (
    <Dialog open={displayModal} onOpenChange={setDisplayModal}>
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
              Booking was created at: {dayjs(booking.createdAt).format("LLLL")}
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
