import { useAuthStore } from "@/store/auth-store";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface HeaderMenuParams {
  closeMenu: () => void;
}

export const HeaderMenu = (params: HeaderMenuParams) => {
  const { user, userAttributes, logOut } = useAuthStore((state) => state);

  return (
    <div className="w-[200px] p-1 relative z-70 bg-background">
      <Link to={`/profile/${user?.role + "/" + user?.id}`}>
        <Button
          onClick={params.closeMenu}
          variant={"outline"}
          className="w-full border-y-2 border-neutral-brown text-center p-2"
        >
          profile
        </Button>
      </Link>
      <div className="border-neutral-brown cursor-pointer">
        <Button
          variant={"destructive"}
          className="w-full border-y-2 border-neutral-brown text-center p-2"
          onClick={() => {
            logOut();
            params.closeMenu();
          }}
        >
          log out
        </Button>
      </div>
    </div>
  );
};
