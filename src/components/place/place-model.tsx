import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Place } from "@/lib/data-type";
import { DialogDescription } from "@radix-ui/react-dialog";
// import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { isPlace } from "@/lib/validation";

export interface PlaceModelParams {
  place: Place | undefined;
  setSelectedPlace: (x: Place | undefined) => void;
}
export default function PlaceModel({
  place,
  setSelectedPlace,
}: PlaceModelParams) {
  dayjs.extend(localizedFormat);
  if (isPlace(place)) {
    return (
      <Dialog
        // modal={false}
        open={isPlace(place)}
        onOpenChange={() => {
          setSelectedPlace(undefined);
        }}
      >
        <DialogContent
          aria-describedby={undefined}
          className="xl:max-w-[80%] sm:max-w-[600px]"
        >
          <DialogHeader>
            <DialogTitle>Place's information</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {place && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{place.name}</CardTitle>
                </CardHeader>

                <CardContent className="border-2 space-y-2 max-h-[300px] overflow-y-scroll">
                  {/* <p>
                  <strong>ID:</strong> {place.id}
                </p> */}
                  <p>
                    <strong>Address:</strong> {place.address}
                  </p>
                  <p>
                    <strong>City:</strong> {place.city}
                  </p>
                  <p>
                    <strong>Country:</strong> {place.country}
                  </p>

                  <p>
                    <strong>Type:</strong> {place.type.join(", ")}
                  </p>

                  <p>
                    <strong>Term Units:</strong> {place.termUnit.join(", ")}
                  </p>

                  <p>
                    <strong>Area:</strong> {place.area} m²
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(place.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Last Update:</strong>{" "}
                    {new Date(place.lastUpdate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Rating:</strong> {place.rating}
                  </p>

                  <p>
                    <strong>Photos:</strong>{" "}
                    {place.photos && place.photos.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {place.photos.map((url, i) => (
                          <li key={i}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Photo {i + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No photos"
                    )}
                  </p>

                  <p>
                    <strong>Status:</strong> {place.status}
                  </p>

                  <p>
                    <strong>Distance From Center:</strong>{" "}
                    {place.distanceFromCenter} km
                  </p>

                  <div>
                    <strong>Attributes:</strong>
                    {place.attributes.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {place.attributes.map((attr) => (
                          <li key={attr.id}>
                            <strong>{attr.name}:</strong>{" "}
                            {attr.valueNumber !== null
                              ? attr.valueNumber +
                                " " +
                                attr.value.toUpperCase()
                              : attr.value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No attributes</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }
}
