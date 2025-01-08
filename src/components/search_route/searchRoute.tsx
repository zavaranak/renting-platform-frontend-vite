import photo from "@assets/photo2.jpg";
import SearchBox from "./search-box";

export default function SearchRoute() {
  return (
    <>
      <div className="flex justify-center col-span-full m-auto bg-dark_blue h-60 w-full overflow-hidden relative">
        <img
          className="object-cover w-[50%] h-auto  absolute bottom-[-80%] "
          src={photo}
        />
      </div>
      <SearchBox />
    </>
  );
}
