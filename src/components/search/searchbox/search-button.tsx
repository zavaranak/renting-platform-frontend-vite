import { useSearchPlaces } from "@/hook/search.hook";
import { TermUnit } from "@/lib/contanst";
import { useSearchStore } from "@/store/search-store";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { Button } from "@/components/ui/button";
loadDevMessages();
loadErrorMessages();
interface ButtonParams {
  size?: string;
}
export default function SearchButton({ size = "large" }: ButtonParams) {
  const { canSearch, selectedDate, term, searchOptionState } = useSearchStore(
    (state) => state
  );
  const { searchPlaces, loading } = useSearchPlaces();
  const handleClick = async () => {
    if (canSearch) {
      console.log(searchOptionState);
      searchPlaces();
    }
    // await searchByParams();
  };

  if (size == "large") {
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
  if (size == "small") {
    return (
      <div>
        <Button
          onClick={handleClick}
          className="m-auto uppercase font-bold justify-center "
        >
          Search
        </Button>
      </div>
    );
  }
}
