import GuestForm from "@/components/booking/guest/guest-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { useFetchGuest } from "@/hook/guest.hook";
import { Guest } from "@/lib/data-type";
import dayjs from "dayjs";
import { useState } from "react";

interface TenantGuestManagerProps {
  tenantId: string;
}

export const TenantGuestManager = ({ tenantId }: TenantGuestManagerProps) => {
  const { guestList, refetch } = useFetchGuest(tenantId);
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [edittingGuest, setEdittingGuest] = useState<Guest | undefined>();

  const handleOpenGuestForm = (guest?: Guest) => {
    setEdittingGuest(guest);
    setDisplayForm(true);
  };

  const handleAction = () => {
    refetch();
    setDisplayForm(false);
  };

  return (
    <Card className="mb-6 p-4 flex flex-col max-h-[320px]">
      <h2 className="text-xl font-bold mb-4">Guests</h2>
      <Table className="relative">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto flex-1">
          {guestList?.map((guest: any) => (
            <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
              <td className=" px-3 py-3 font-medium">
                {[guest.firstName, guest.middleName, guest.lastName].join(" ")}
              </td>
              <td className="px-2 py-3">{guest.gender.toLowerCase()}</td>
              <td className="px-2 py-3">
                {dayjs(Number(guest.birthday)).format("DD/MM/YYYY")}
              </td>
              <td className="px-2 py-3 text-blue-600">{guest.email}</td>
              <td className="px-2 py-3 whitespace-nowrap">{guest.tel}</td>
              <td className="px-2 py-3 flex gap-2">
                <Button
                  onClick={() => {
                    handleOpenGuestForm(guest);
                  }}
                  variant="ghost"
                >
                  Edit
                </Button>
                <Button variant="ghost">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={() => handleOpenGuestForm()} className="mt-4">
        Add Guest
      </Button>
      {displayForm && (
        <GuestForm
          displayForm={displayForm}
          setDisplayForm={setDisplayForm}
          editGuest={edittingGuest}
          tenantId={tenantId}
          guestListPush={handleAction}
          guestListUpdate={handleAction}
        />
      )}
    </Card>
  );
};
