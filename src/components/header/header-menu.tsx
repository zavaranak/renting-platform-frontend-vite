import { useAuthStore } from "@/store/auth-store";
import { Link } from "react-router-dom";

interface HeaderMenuParams {
  closeMenu: () => void;
}

export const HeaderMenu = (params: HeaderMenuParams) => {
  const { user, userAttributes, logOut } = useAuthStore((state) => state);

  return (
    <div className="w-[200px] p-3 relative z-70 bg-background">
      <Link to={`/profile/${user?.role + "/" + user?.id}`}>
        <div
          onClick={params.closeMenu}
          className="border-y-2 border-neutral-brown text-center p-2"
        >
          {userAttributes.FIRSTNAME?.value +
            " " +
            userAttributes.LASTNAME?.value}
        </div>
      </Link>
      <div className="border-b-2 border-neutral-brown cursor-pointer p-2">
        <div
          className="text-center"
          onClick={() => {
            logOut();
            params.closeMenu();
          }}
        >
          log out
        </div>
      </div>
    </div>
  );
};
