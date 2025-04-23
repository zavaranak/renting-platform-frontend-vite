import photo from "@/assets/photo2.jpg";
import SearchBox from "@/components/search/searchbox/search-box";
import { useFetchCountriesAndCites } from "@/hook/place.hook";
import { Role } from "@/lib/contanst";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchRoute() {
  useFetchCountriesAndCites();
  const navigate = useNavigate();
  const { user } = useAuthStore((state) => state);
  useEffect(() => {
    if (user?.role == Role.landlord) {
      navigate(`/profile/${user.role}/${user.id}`);
    }
  }, [user]);
  return (
    <>
      <div className="lg:col-start-4 lg:col-span-6 md:col-start-2 md:col-span-6 z-50flex justify-center col-span-full m-auto bg-dark_blue h-60 w-full overflow-hidden relative">
        <img
          className="object-cover h-auto  absolute bottom-[-150%] "
          src={photo}
        />
      </div>
      <SearchBox />
    </>
  );
}
