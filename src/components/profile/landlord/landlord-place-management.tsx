import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Place } from "@/lib/data-type";
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
interface PlaceTableParam {
  landlordId: string;
}

export const LandlordPlaceManagement = ({ landlordId }: PlaceTableParam) => {
  const { queryPlacesByLandlord, places, loading } =
    useQueryPlacesByLandlord(landlordId);
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
    undefined
  );
  const [updatePlace, setUpdatePlace] = useState<Place | undefined>(undefined);

  useEffect(() => {
    queryPlacesByLandlord();
  }, []);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Place management [{places.length}] {selectedPlace?.name}
      </h2>
      <PlaceForm refreshDashboard={queryPlacesByLandlord} />
      {updatePlace != undefined && (
        <PlaceUpdateForm
          place={updatePlace}
          setPlace={setUpdatePlace}
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
                <TableCell className="">{place.status}</TableCell>
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
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <PlaceModel place={selectedPlace} setSelectedPlace={setSelectedPlace} />
    </div>
  );
};
