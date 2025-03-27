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
              <p>{place.name}</p>
            </CardHeader>
            <CardContent>
              <p>
                {place?.address}, {place.city}, {place.country}
              </p>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
