import photo from "@assets/photo2.jpg";
import SearchBox from "./search-box";
import { UseFetchCountriesAndCites } from "@hook/fetch-countries-and-cities-hook";

export default function SearchRoute() {
  UseFetchCountriesAndCites();
  return (
    <>
      <div className="py-3 lg:col-start-4 lg:col-span-6 md:col-start-2 md:col-span-6 z-50flex justify-center col-span-full m-auto bg-dark_blue h-60 w-full overflow-hidden relative">
        <img
          className="object-cover h-auto  absolute bottom-[-150%] "
          src={photo}
        />
      </div>
      <SearchBox />
    </>
  );
}
