import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Place, PlaceAttribute } from "@/lib/data-type";
import { useQueryPlacesByLandlord } from "@/hook/place.hook";
import { Button } from "@/components/ui/button";
import PlaceModel from "@/components/place/place-model";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PlaceForm, PlaceUpdateForm } from "@/components/place/place-form";
import { PlaceAttributeForm } from "@/components/place/place-property-form";
import { Card } from "@/components/ui/card";
import { PhotoUpdateDialog } from "@/components/place/place-photos-form";

interface PlaceTableParam {
  landlordId: string;
  setPlacesId: (array: string[]) => void;
}

export interface PlaceUpdateAttributeInterface {
  placeId: string;
  placeAddress: string;
  placeName: string;
  attributes: PlaceAttribute[];
}
export interface PlaceUpdatePhotoInterface {
  placeId: string;
  placeAddress: string;
  placeName: string;
  photos: string[];
}

export const LandlordPlaceManagement = ({
  landlordId,
  setPlacesId,
}: PlaceTableParam) => {
  const { queryPlacesByLandlord, places, loading } =
    useQueryPlacesByLandlord(landlordId);
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
    undefined
  );
  const [currentPhotos, setCurrentPhotos] = useState<
    PlaceUpdatePhotoInterface | undefined
  >(undefined);
  const [updatePlace, setUpdatePlace] = useState<Place | undefined>(undefined);
  const [updateAttributes, setUpdateAttributes] = useState<
    PlaceUpdateAttributeInterface | undefined
  >(undefined);

  useEffect(() => {
    queryPlacesByLandlord();
  }, []);
  useEffect(() => {
    if (places.length > 0) {
      const placeIds = places.map((place) => place.id);
      setPlacesId(placeIds);
    }
  }, [places]);

  return (
    <div>
      <Card className="p-2">
        <h2 className="text-xl font-bold mb-2">
          Place management {selectedPlace?.name}
        </h2>
        <PlaceForm refreshDashboard={queryPlacesByLandlord} />
        {updatePlace != undefined && (
          <PlaceUpdateForm
            place={updatePlace}
            setPlace={setUpdatePlace}
            refreshDashboard={queryPlacesByLandlord}
          />
        )}
        {updateAttributes != undefined && (
          <PlaceAttributeForm
            data={updateAttributes}
            setSelectedAttributes={setUpdateAttributes}
            refreshDashboard={queryPlacesByLandlord}
          />
        )}
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>
                Area (m <sup>2</sup> )
              </TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Attributes</TableHead> */}
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          {loading || (
            <TableBody className="overflow-y-auto flex-1">
              {places?.map((place: Place) => (
                <TableRow
                  key={place.id}
                  className="hover:bg-gray-50 TableRowansition-colors"
                >
                  <TableCell className="">{place.name}</TableCell>
                  <TableCell className="">{place.country}</TableCell>
                  <TableCell className="">{place.city}</TableCell>
                  <TableCell className="">{place.address}</TableCell>
                  <TableCell className="">{place.area}</TableCell>
                  <TableCell className="">
                    {place.status.toLowerCase().replace("_", " ")}
                  </TableCell>
                  {/* <TableCell className="">{place.attributes?.length}</TableCell> */}
                  {/* <TableCell className="">actions</TableCell> */}

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-black">
                        <div className="font-bold p-2 rounded-md bg-dark_brown text-text_light_panel">
                          Actions
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="pointer-events-none">
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(() => {
                                setSelectedPlace(place);
                              }, 10);
                            }}
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            View
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(() => {
                                setUpdatePlace(place);
                              }, 10);
                            }}
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            Update
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(() => {
                                setUpdateAttributes({
                                  placeId: place.id,
                                  placeName: place.name,
                                  placeAddress:
                                    place.address + `(` + place.city + ")",
                                  attributes: place.attributes,
                                });
                              }, 10);
                            }}
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            Manage
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              setTimeout(() => {
                                setCurrentPhotos({
                                  placeId: place.id,
                                  placeName: place.name,
                                  placeAddress:
                                    place.address + `(` + place.city + ")",
                                  photos: place.photos ?? [],
                                });
                              }, 10);
                            }}
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            Place's photos
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        <PlaceModel place={selectedPlace} setSelectedPlace={setSelectedPlace} />

        {currentPhotos != undefined && (
          <PhotoUpdateDialog
            updatePhotoInterface={currentPhotos}
            setPhotosInterface={setCurrentPhotos}
          />
        )}
      </Card>
    </div>
  );
};
