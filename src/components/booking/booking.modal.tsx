"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ActiveBooking,
  CompletedBooking,
  Guest,
  PendingBooking,
  QueryManyInput,
} from "@/lib/data-type";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust import path based on your setup
// import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useQueryPlace } from "@/hook/place.hook";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
// import { isPendingBooking } from "@/lib/validation";
import { useFetchGuests } from "@/hook/guest.hook";
import { Operator, TermUnit } from "@/lib/contanst";

export interface BookingModalPros {
  booking: PendingBooking | ActiveBooking | CompletedBooking | undefined;
  setSelectedBooking: (x: PendingBooking | undefined) => void;
  type: "Pending" | "Active" | "Completed" | undefined;
}
export default function BookingModal({
  type,
  booking,
  setSelectedBooking,
}: BookingModalPros) {
  if (booking != undefined) {
    const { place } = useQueryPlace(booking.placeId);

    const setupGuestQueryParams = (): QueryManyInput => {
      if (booking.guests.length > 0) {
        const queryValue = booking.guests.reduce(
          (prev, current, index, arr) => {
            const lastSymbol = index != arr.length - 1 ? "," : "";
            const newVal = prev + "'" + current + "'" + lastSymbol;
            return newVal;
          },
          ""
        );

        return {
          conditions: [
            {
              value: queryValue,
              key: "id",
              operator: Operator.IN,
            },
          ],
        };
      } else
        return {
          conditions: [],
        };
    };

    const { guestList } = useFetchGuests(setupGuestQueryParams());
    dayjs.extend(localizedFormat);

    return (
      <Dialog
        open={booking != undefined}
        onOpenChange={() => setSelectedBooking(undefined)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {type && type != "Completed"
                ? type
                : (booking as CompletedBooking).status.toLocaleUpperCase()}{" "}
              booking for [{booking.termUnit}]
            </DialogTitle>
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
              <CardContent>
                <BookingGuestsTable guests={guestList} />
              </CardContent>
              <CardContent>
                For {booking.period} {booking.termUnit?.toLowerCase()}
                {booking.period > 1 ? "s" : ""}
              </CardContent>
              <CardContent>Total charge: {booking.totalCharge} USD</CardContent>
              {[TermUnit.DAY, TermUnit.HOUR].includes(booking.termUnit) && (
                <CardContent>
                  From {dayjs(Number(booking.startAt)).format("DD/MM/YYYY")} to{" "}
                  {dayjs(Number(booking.endAt)).format("DD/MM/YYYY")}{" "}
                </CardContent>
              )}
              <CardContent>
                Booking was created at:
                {dayjs(booking.createdAt).format("LLLL")}
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    );
  } else return <></>;
}

interface BookingGuestsTableParams {
  guests: Guest[];
}

export function BookingGuestsTable({ guests }: BookingGuestsTableParams) {
  if (guests.length > 0)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            {/* Add additional headers as needed */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.length > 0 ? (
            guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell>
                  {guest.firstName + guest.middleName + guest.lastName}
                </TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell>{guest.tel || "-"}</TableCell>

                {/* Add additional cells as needed */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No guests found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
}
