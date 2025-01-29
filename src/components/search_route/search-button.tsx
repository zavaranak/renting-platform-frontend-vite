import { useSearchPlaces } from "@/hook/search-hook";
import { TermUnit } from "@/lib/contanst";
import { useSearchStore } from "@/store/search-store";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
loadDevMessages();
loadErrorMessages();
export default function SearchButton() {
  const { canSearch, selectedDate, term } = useSearchStore((state) => state);
  const { searchPlaces, loading } = useSearchPlaces();
  const handleClick = async () => {
    searchPlaces();
    // await searchByParams();
  };

  const disabledClass =
    "mt-[-3px] border-2 border-neutral_brown border-t-transparent bg-neutral_grey p-2 text-background flex cursor-not-allowed";
  const activeClass =
    "mt-[-3px] border-2 border-neutral_brown border-t-neutral_brown bg-neurtal_brown p-2 text-neutral_brown flex hover:text-background hover:bg-neutral_brown cursor-pointer";
  return (
    <div
      onClick={handleClick}
      className={
        (!loading &&
          canSearch &&
          ((term != TermUnit.DAY && term != TermUnit.HOUR) || selectedDate) &&
          activeClass) ||
        disabledClass
      }
    >
      <div className="m-auto uppercase font-bold justify-center ">Search</div>
    </div>
  );
}
