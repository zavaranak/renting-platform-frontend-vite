import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Place } from "@/lib/data-type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { isPlace } from "@/lib/validation";

dayjs.extend(localizedFormat);

export interface PlaceModelParams {
  place: Place | undefined;
  setSelectedPlace: (x: Place | undefined) => void;
}

export default function PlaceModel({
  place,
  setSelectedPlace,
}: PlaceModelParams) {
  if (!place || !isPlace(place)) return null;
  return (
    <Dialog
      open={isPlace(place)}
      onOpenChange={() => setSelectedPlace(undefined)}
    >
      <DialogContent className="w-full max-w-[95vw] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Place Information</DialogTitle>
          <DialogDescription>Detailed view of {place.name}</DialogDescription>
        </DialogHeader>

        <Card className="mt-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl font-bold">{place.name}</CardTitle>
          </CardHeader>

          <CardContent className="max-h-[60vh] overflow-y-auto grid gap-6 p-6">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoItem label="Address" value={place.address} />
              <InfoItem label="City" value={place.city} />
              <InfoItem label="Country" value={place.country} />
              <InfoItem label="Type" value={place.type.join(", ")} />
              <InfoItem label="Term Units" value={place.termUnit.join(", ")} />
              <InfoItem label="Area" value={`${place.area} m²`} />
              <InfoItem
                label="Created At"
                value={new Date(place.createdAt).toLocaleString()}
              />
              <InfoItem
                label="Last Update"
                value={new Date(place.lastUpdate).toLocaleString()}
              />
              <InfoItem label="Rating" value={place.rating} />
              <InfoItem
                label="Distance From Center"
                value={`${place.distanceFromCenter} km`}
              />
              <InfoItem label="Status" value={place.status} />
            </div>

            {/* Photos Section */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Photos</h3>
              {place.photos && place.photos?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {place.photos.map((url, i) => (
                    <img
                      key={i}
                      src={`/storage/places/${place.id}/${url}`}
                      alt={`${place.name} photo ${i + 1}`}
                      className="h-32 w-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      loading="lazy"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No photos available</p>
              )}
            </div>

            {/* Attributes Section */}
            {place.attributes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Attributes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {place.attributes.map((attr) => (
                    <div key={attr.id} className="bg-muted/50 p-3 rounded-lg">
                      <p className="font-medium">{attr.name}</p>
                      <p className="text-sm">
                        {attr.valueNumber !== null
                          ? `${attr.valueNumber} ${attr.value.toUpperCase()}`
                          : attr.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for consistent info items
function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}
