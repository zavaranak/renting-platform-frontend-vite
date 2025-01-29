import HeaderItem from "./header-item";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useRef, useState } from "react";
import LoginForm from "../form/login-form";
import { ProfileMenu } from "../menu/profile-menu";
import { useAuthHook } from "@/hook/auth-hook";
export const Header = () => {
  const [displayLogInMenu, setDisplayLogInMenu] = useState(false);
  const [displayProfileMenu, setDisplayProfileMenu] = useState(false);
  const { isAuthenticated } = useAuthStore((state) => state);
  const { useVerifyUser } = useAuthHook();
  useVerifyUser();
  const menuDiv = useRef<HTMLDivElement>(null);
  const toggleLogInMenu = () => {
    // setDisplayLogInMenu((prev) => !prev);
  };
  const toggleProfileMenu = () => {
    setDisplayProfileMenu((prev) => !prev);
  };
  useEffect(() => {
    const handleCloseMenu = (event: MouseEvent) => {
      if (menuDiv.current && !menuDiv.current.contains(event.target as Node)) {
        setDisplayLogInMenu(false);
        setDisplayProfileMenu(false);
      }
    };
    document.addEventListener("click", handleCloseMenu);
    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, []);
  useEffect(() => {}, [isAuthenticated]);

  return (
    <div className="fixed top-0 w-full overflow z-20 bg-background_brown">
      <div className="flex justify-between  text-foreground pl-8 pr-20 p-2 text-sm font-bold ">
        <a href="/">
          <div className="">Company name</div>
        </a>
        <div className="flex space-x-20">
          <div className="relative">
            {(isAuthenticated && (
              <div ref={menuDiv}>
                <HeaderItem>
                  <div onClick={toggleProfileMenu}>my profile</div>
                </HeaderItem>
                {displayProfileMenu && (
                  <div className="absolute right-1 mt-2 w-max bg-white border border-gray-200 rounded shadow-lg ">
                    <ProfileMenu />
                  </div>
                )}
              </div>
            )) || (
              <div ref={menuDiv}>
                <HeaderItem>
                  <a href="/login">
                    <div onClick={toggleLogInMenu}>log in</div>
                  </a>
                </HeaderItem>
                {displayLogInMenu && (
                  <div className="absolute right-1 mt-2 w-max bg-white border border-gray-200 rounded shadow-lg ">
                    <LoginForm />
                  </div>
                )}
              </div>
            )}
          </div>
          <HeaderItem>english</HeaderItem>
        </div>
      </div>
      <div className="flex justify-between bg-dark_blue text-white pl-8 pr-20 p-2 uppercase">
        <div className="text-sm cursor-pointer">
          <div>Homsk</div>
          <div>logo and name</div>
        </div>
        <div className="flex space-x-20 text-lg">
          <HeaderItem>Location</HeaderItem>
          <HeaderItem>Ask a question</HeaderItem>
          <HeaderItem>Notification</HeaderItem>
          <HeaderItem>Favorite</HeaderItem>
        </div>
      </div>
    </div>
  );
};
