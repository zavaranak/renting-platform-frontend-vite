import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GuestCard } from "./guest-card";
import { Guest } from "@/lib/data-type";

import { useAuthStore } from "@/store/auth-store";

import { useFetchGuests } from "@/hook/guest.hook";
import GuestForm from "./guest-form";

interface GuestManagerProps {
  setGuests: (cb: (guest: string[]) => string[]) => void;
}

const GuestManager = (params: GuestManagerProps) => {
  const { setGuests } = params;
  const { user } = useAuthStore((state) => state);
  if (user) {
    const [openAddGuest, setDisplayGuestForm] = useState(false);
    const [openGuestList, setOpenGuestList] = useState(false);
    const [selectedGuests, setSelectedGuests] = useState<Guest[]>([]);
    const [edittingGuest, setEdittingGuest] = useState<Guest | undefined>(
      undefined
    );
    const { guestList, setGuestList } = useFetchGuests(user.id);

    const openGuestForm = (guest?: Guest) => {
      if (guest) {
        setEdittingGuest(guest);
      }

      setDisplayGuestForm(true);
    };

    const handleSelectGuest = (guest: Guest) => {
      if (guest.id && !selectedGuests.find((g) => g.id === guest.id)) {
        setSelectedGuests((prev) => [...prev, guest]);
        setGuests((prev) => [...prev, guest.id as string]);
      }
      setOpenGuestList(false);
    };

    const handleRemoveGuest = (guest: Guest) => {
      setSelectedGuests((prev) => prev.filter((g) => g.id !== guest.id));
    };

    const guestListUpdate = (guest: Guest) => {
      setSelectedGuests((prev) =>
        prev.map((g) => (g.id === guest.id ? guest : g))
      );
      setGuestList((prev) => prev.map((g) => (g.id === guest.id ? guest : g)));
      setDisplayGuestForm(false);
      setEdittingGuest(undefined);
    };

    const guestListPush = (guest: Guest) => {
      setGuestList((prev) => [...prev, guest]);
      setSelectedGuests((prev) => [...prev, guest]);
      setDisplayGuestForm(false);
    };

    return (
      <div className="space-y-4">
        {/* Combined button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              Manage Guests
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Button
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setTimeout(() => setOpenGuestList(true), 10);
                }}
              >
                Select from guest list
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setTimeout(() => openGuestForm(), 10);
                }}
              >
                Add new guest
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Selected Guests List */}
        {selectedGuests.length > 0 && (
          <div className="h-[100px] overflow-y-scroll">
            <div className="space-y-2">
              {selectedGuests.map((guest, index) => (
                <GuestCard
                  key={"guest-card-" + index}
                  guest={guest}
                  onEdit={() => openGuestForm(guest)}
                  onDelete={() => handleRemoveGuest(guest)}
                />
              ))}
            </div>
          </div>
        )}

        {openAddGuest && (
          <GuestForm
            displayForm={openAddGuest}
            setDisplayForm={setDisplayGuestForm}
            editGuest={edittingGuest}
            tenantId={user.id}
            guestListPush={guestListPush}
            guestListUpdate={guestListUpdate}
          />
        )}

        <Dialog open={openGuestList} onOpenChange={setOpenGuestList}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Select Guest</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-48 rounded-md border">
              {guestList.map((guest, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-2 cursor-pointer hover:bg-accent hover:text-accent-foreground border-b last:border-none"
                  )}
                  onClick={() => handleSelectGuest(guest)}
                >
                  {guest.lastName} {guest.firstName} {guest.middleName}
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
};

export default GuestManager;
