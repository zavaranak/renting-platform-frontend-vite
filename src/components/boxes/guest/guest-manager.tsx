import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import dayjs from "dayjs";
import { Gender } from "@/lib/contanst";
import { useAuthStore } from "@/store/auth-store";
import { nanoid } from "nanoid";

import { useCreateGuest, useFetchGuest } from "@/hook/guest.hook";

interface GuestManagerProps {
  //   setGuests: (guest: string[]) => void;
  setGuests: (cb: (guest: string[]) => string[]) => void;
}

const GuestManager = (params: GuestManagerProps) => {
  const { setGuests } = params;
  const { user } = useAuthStore((state) => state);
  if (user) {
    const [openAddGuest, setOpenAddGuest] = useState(false);
    const [openGuestList, setOpenGuestList] = useState(false);
    const [selectedGuests, setSelectedGuests] = useState<Guest[]>([]);
    const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const { createGuest } = useCreateGuest();
    const { guestList, setGuestList } = useFetchGuest(user.id);

    const validateGuest = () => {
      const errors: { [key: string]: string } = {};
      if (editingGuest) {
        if (!editingGuest.firstName)
          errors.firstName = "First Name is required";
        if (!editingGuest.lastName) errors.lastName = "Last Name is required";
        if (!editingGuest.email) errors.email = "Email is required";
        if (editingGuest.email && !/\S+@\S+\.\S+/.test(editingGuest.email))
          errors.email = "Invalid email format";
      } else {
        if (!newGuest.firstName) errors.firstName = "First Name is required";
        if (!newGuest.lastName) errors.lastName = "Last Name is required";
        if (!newGuest.email) errors.email = "Email is required";
        if (newGuest.email && !/\S+@\S+\.\S+/.test(newGuest.email))
          errors.email = "Invalid email format";
      }

      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const fetchGuest = async () => {};

    // New guest form state
    const [newGuest, setNewGuest] = useState<Guest>({
      id: "new-guest" + nanoid(),
      email: "",
      birthday: Number(dayjs.valueOf()),
      firstName: "",
      gender: Gender.OTHER,
      lastName: "",
      middleName: "",
      tel: "",
      tenantId: user?.id || "",
    });

    const openAddGuestDialog = (guest?: Guest) => {
      if (guest) {
        setEditingGuest(guest);
        setNewGuest(guest);
      } else {
        setEditingGuest(null);
        setNewGuest({
          id: "new-guest" + nanoid(),
          email: "",
          birthday: Number(dayjs.valueOf()),
          firstName: "",
          gender: Gender.OTHER,
          lastName: "",
          middleName: "",
          tel: "",
          tenantId: user?.id || "",
        });
      }
      setOpenAddGuest(true);
    };

    const handleSelectGuest = (guest: Guest) => {
      if (guest.id && !selectedGuests.find((g) => g.id === guest.id)) {
        setSelectedGuests((prev) => [...prev, guest]);
        setGuests((prev) => [...prev, guest.id as string]);
      }
      setOpenGuestList(false);
    };

    const handleSaveGuest = async () => {
      if (!validateGuest()) return;
      if (editingGuest) {
        // Edit existing guest in selected list
        setSelectedGuests((prev) =>
          prev.map((g) => (g.id === editingGuest.id ? newGuest : g))
        );
        setGuestList((prev) =>
          prev.map((g) => (g.id === editingGuest.id ? newGuest : g))
        );
        setOpenAddGuest(false);
      } else {
        // Add new guest
        const newGuestId = await createGuest(newGuest);
        if (newGuestId) {
          newGuest.id = newGuestId;
          setGuestList((prev) => [...prev, newGuest]);
          setSelectedGuests((prev) => [...prev, newGuest]);
          setOpenAddGuest(false);
        }
      }
    };

    const handleRemoveGuest = (guest: Guest) => {
      setSelectedGuests((prev) => prev.filter((g) => g.id !== guest.id));
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
            <DropdownMenuItem
              onClick={async () => {
                setOpenGuestList(true);
                await fetchGuest();
              }}
            >
              Select from guest list
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openAddGuestDialog()}>
              Add new guest
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
                  onEdit={() => openAddGuestDialog(guest)}
                  onDelete={() => handleRemoveGuest(guest)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Add/Edit Guest Dialog */}
        <Dialog open={openAddGuest} onOpenChange={setOpenAddGuest}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingGuest ? "Edit Guest" : "Add New Guest"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 ">
              <div className="flex gap-2">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    value={newGuest.firstName || ""}
                    onChange={(e) =>
                      setNewGuest({ ...newGuest, firstName: e.target.value })
                    }
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    value={newGuest.lastName || ""}
                    onChange={(e) =>
                      setNewGuest({ ...newGuest, lastName: e.target.value })
                    }
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm">
                      {formErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Middle Name */}
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name (Optional)</Label>
                <Input
                  id="middleName"
                  placeholder="Middle Name"
                  value={newGuest.middleName || ""}
                  onChange={(e) =>
                    setNewGuest({ ...newGuest, middleName: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2">
                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(value) => {
                      setNewGuest({ ...newGuest, gender: value });
                    }}
                    value={newGuest.gender}
                  >
                    <SelectTrigger id="gender" className="w-[100px]">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Gender.MALE}>Male</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                      <SelectItem value={Gender.OTHER}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Birthday */}
                <div className="space-y-2">
                  <Label htmlFor="birthday">Date of Birth</Label>
                  <Input
                    className="w-[150px]"
                    id="birthday"
                    type="date"
                    value={
                      newGuest.birthday
                        ? dayjs(newGuest.birthday).format("YYYY-MM-DD")
                        : ""
                    }
                    onChange={(e) =>
                      setNewGuest({
                        ...newGuest,
                        birthday: dayjs(e.target.value).valueOf(),
                      })
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={newGuest.email || ""}
                  onChange={(e) =>
                    setNewGuest({ ...newGuest, email: e.target.value })
                  }
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">{formErrors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="tel">Phone Number</Label>
                <Input
                  id="tel"
                  placeholder="Phone Number"
                  value={newGuest.tel || ""}
                  onChange={(e) =>
                    setNewGuest({ ...newGuest, tel: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveGuest}>
                {editingGuest ? "Save Changes" : "Add Guest"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Guest List Dialog */}
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
