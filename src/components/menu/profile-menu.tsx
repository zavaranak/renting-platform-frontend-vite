import { useAuthStore } from "@/store/auth-store";
import { Link } from "react-router-dom";

export const ProfileMenu = () => {
  const { user, userAttributes, logOut } = useAuthStore((state) => state);
  let tempString = "";
  userAttributes.forEach((attribute) => {
    tempString += attribute.value + "";
  });

  return (
    <div className="w-[200px] p-3 relative z-70 bg-background">
      <Link to={`/profile/${user?.role + "/" + user?.id}`}>
        <div className="border-t-2 border-neutral-brown text-center">
          profile
        </div>
      </Link>
      <div className="text-wrap text-center border-y-2 border-neutral-brown">
        {tempString}
      </div>
      <div className="border-b-2 border-neutral-brown cursor-pointer">
        <div className="text-center" onClick={() => logOut()}>
          log out
        </div>
      </div>
    </div>
  );
};
