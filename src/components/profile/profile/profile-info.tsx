import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import ProfileEditForm from "./profile-edit-form";
import { useLazyVerifyUser } from "@/hook/auth.hook";
import dayjs from "dayjs";
import { Role } from "@/lib/contanst";

export default function ProfileInfo() {
  const { verifyUser } = useLazyVerifyUser();
  const { user, userAttributes } = useAuthStore((state) => state);
  const fullName = [
    userAttributes.FIRSTNAME?.value,
    userAttributes.MIDDLENAME?.value,
    userAttributes.LASTNAME?.value,
  ]
    .filter(Boolean)
    .join(" ");
  const handleChangeProfile = async () => {
    await verifyUser();
    return;
  };

  if (user) {
    return (
      <Card className="mb-6 p-4">
        <h2 className="text-xl font-bold mb-4">
          Profile of {(user.role == Role.tenant && "tenant") || "landlord"}
        </h2>
        <h3 className="text-md font-bold mb-4">Email: {user?.username}</h3>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {fullName}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {userAttributes.TEL?.value || "Not provided"}
          </p>
          <p>
            <strong>Birthday:</strong>{" "}
            {dayjs(Number(userAttributes.BIRTHDAY?.value)).format(
              "DD/MM/YYYY"
            ) || "Not provided"}
          </p>
          <p>
            <strong>Gender:</strong>{" "}
            {userAttributes.GENDER?.value || "Not provided"}
          </p>
          <p>
            <strong>Country:</strong>{" "}
            {userAttributes.COUNTRY?.value || "Not provided"}
          </p>
        </div>

        <ProfileEditForm
          onChangeProfile={handleChangeProfile}
          role={user.role}
        />
      </Card>
    );
  }
}
