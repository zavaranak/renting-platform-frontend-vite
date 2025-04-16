import OptionSwitchButton from "./option-switch-button";
import { LivingPlaceType, SearchOption, TermUnit } from "@/lib/contanst";

import SearchButton from "./search-button";
import MainSearchBox from "./options_of_search_box/main-search-box";
import { useSearchStore } from "@/store/search-store";
import SortSearchBox from "./options_of_search_box/sort-search-box";
import { useEffect } from "react";

export default function SearchBox() {
  const {
    currentOption,
    searchOptionState,
    setCurrentOption,
    setTerm,
    setType,
  } = useSearchStore((state) => state);

  useEffect(() => {
    setTerm(TermUnit.DAY);
    setType(LivingPlaceType.HOUSE);
  }, []);

  return (
    <div className="lg:col-start-4 lg:col-span-6 md:col-start-2 md:col-span-6 col-span-full w-full z-10">
      {
        <>
          <div className="flex mx-auto space-x-2 text-lg uppercase font-bold">
            <OptionSwitchButton
              index={0}
              trigger={() => setCurrentOption(0)}
              active={0 === currentOption}
            >
              Search Place
            </OptionSwitchButton>
            <OptionSwitchButton
              index={2}
              trigger={() => setCurrentOption(2)}
              active={2 === currentOption}
            >
              Filter
            </OptionSwitchButton>
          </div>

          <div className="flex w-full flex-col md:flex-row space-x-0">
            {searchOptionState[currentOption].searchOption ===
              SearchOption.LOCATION && <MainSearchBox />}
            {searchOptionState[currentOption].searchOption ===
              SearchOption.SORT && <SortSearchBox />}
          </div>
          <SearchButton />
        </>
      }
    </div>
  );
}
