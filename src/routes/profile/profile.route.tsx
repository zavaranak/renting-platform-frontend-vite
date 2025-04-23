import ProfileInfo from "@/components/profile/profile/profile-info";
import { Role } from "@/lib/contanst";
import { useAuthStore } from "@/store/auth-store";
import { useNavigate } from "react-router-dom";
import { TenantGuestManager } from "@/components/profile/tenant/tenant-guest-mananger";
import { TenantBookingManager } from "@/components/profile/tenant/tenant-booking-mananger";
import { LandlordPlaceManagement } from "@/components/profile/landlord/landlord-place-management";
import { useEffect, useState } from "react";
import { LandlordBookingManagement } from "@/components/profile/landlord/landlord-booking-management";

export function ProfileRoute() {
  const { user } = useAuthStore((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  if (user)
    if (user.role === Role.tenant) {
      document.title = "Homsk - Tenant Profile";
      return (
        <div className="lg:col-start-4 lg:col-span-6 md:col-start-2 md:col-span-6 col-span-full w-full z-10">
          <div className="p-4">
            <ProfileInfo />
            <TenantBookingManager tenantId={user.id} />
            <TenantGuestManager tenantId={user.id} />
          </div>
        </div>
      );
    } else if (user.role === Role.landlord) {
      const [placesId, setPlacesId] = useState<string[]>([]);
      document.title = "Homsk - Landlord Profile";

      return (
        <div className="lg:col-start-4 lg:col-span-6 md:col-start-2 md:col-span-6 col-span-full w-full z-10">
          <div className="flex flex-col gap-6 p-4">
            <ProfileInfo />
            <LandlordBookingManagement placesId={placesId} />
            <LandlordPlaceManagement
              landlordId={user.id}
              setPlacesId={setPlacesId}
            />
          </div>
        </div>
      );
    }
}
