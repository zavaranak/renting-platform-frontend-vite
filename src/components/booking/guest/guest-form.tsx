import { useEffect, useState } from "react";
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
import { Guest } from "@/lib/data-type";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { Gender } from "@/lib/contanst";
import { parseGuestToUpdateGuestParams } from "@/lib/utils";
import { useCreateGuest, useUpdateGuest } from "@/hook/guest.hook";

interface ClientInfoFormProps {
  displayForm: boolean;
  setDisplayForm: (x: boolean) => void;
  // edittingId: string | undefined;
  editGuest: Guest | undefined;
  tenantId: string;
  // selectedGuest: Guest[];
  guestListUpdate: (x: Guest) => void;
  guestListPush: (x: Guest) => void;
}

export default function GuestForm({
  displayForm,
  setDisplayForm,
  editGuest,
  tenantId,
  guestListUpdate,
  guestListPush,
}: ClientInfoFormProps) {
  const [guest, setGuest] = useState<Guest>({
    id: "new-guest" + nanoid(),
    email: "",
    birthday: Number(dayjs.valueOf()),
    firstName: "",
    gender: Gender.OTHER,
    lastName: "",
    middleName: "",
    tel: "",
    tenantId: tenantId || "",
  });

  const [edittingId, setEditingId] = useState<string | undefined>();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const validateGuest = () => {
    const errors: { [key: string]: string } = {};

    if (!guest.firstName) errors.firstName = "First Name is required";
    if (!guest.lastName) errors.lastName = "Last Name is required";
    if (!guest.email) errors.email = "Email is required";
    if (guest.email && !/\S+@\S+\.\S+/.test(guest.email))
      errors.email = "Invalid email format";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const { updateGuest } = useUpdateGuest();
  const { createGuest } = useCreateGuest();
  const onSubmit = async () => {
    if (!validateGuest()) return;
    if (edittingId) {
      const parsedGuest = parseGuestToUpdateGuestParams(guest);

      const update = await updateGuest(parsedGuest);
      if (update) {
        guestListUpdate(guest);
        setDisplayForm(false);
      }
    } else {
      // Add new guest

      const guestId = await createGuest(guest);
      if (guestId) {
        guest.id = guestId;
        guestListPush(guest);
        setDisplayForm(false);
      }
    }
  };

  useEffect(() => {
    if (editGuest) {
      setEditingId(editGuest.id);
      setGuest(editGuest);
    } else {
      setEditingId(undefined);
      setGuest({
        id: "new-guest" + nanoid(),
        email: "",
        birthday: Number(dayjs.valueOf()),
        firstName: "",
        gender: Gender.OTHER,
        lastName: "",
        middleName: "",
        tel: "",
        tenantId: tenantId,
      });
    }
  }, []);

  return (
    <Dialog open={displayForm} onOpenChange={setDisplayForm}>
      <DialogContent aria-describedby={undefined} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {edittingId ? "Edit Guest" : "Add New Guest"}
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
                value={guest.firstName || ""}
                onChange={(e) =>
                  setGuest({ ...guest, firstName: e.target.value })
                }
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm">{formErrors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                value={guest.lastName || ""}
                onChange={(e) =>
                  setGuest({ ...guest, lastName: e.target.value })
                }
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          {/* Middle Name */}
          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name (Optional)</Label>
            <Input
              id="middleName"
              placeholder="Middle Name"
              value={guest.middleName || ""}
              onChange={(e) =>
                setGuest({ ...guest, middleName: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2">
            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => {
                  setGuest({ ...guest, gender: value });
                }}
                value={guest.gender}
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
                  guest.birthday
                    ? dayjs(guest.birthday).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) =>
                  setGuest({
                    ...guest,
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
              value={guest.email || ""}
              onChange={(e) => setGuest({ ...guest, email: e.target.value })}
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
              value={guest.tel || ""}
              onChange={(e) => setGuest({ ...guest, tel: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>
            {edittingId ? "Save Changes" : "Add Guest"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
