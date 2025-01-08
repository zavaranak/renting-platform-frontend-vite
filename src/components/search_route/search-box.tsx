import OptionSwitchButton from './option-switch-button';
import { SearchOption, searchOptionData } from '@lib/contanst';
import SearchButton from './search-button';

import TypeSearchBox from './options_of_search_box/type-search-box';
import LocationSearchBox from './options_of_search_box/location-search-box';
import TermSearchBox from './options_of_search_box/term-search-box';
import { useSearchStore } from '@store/search-store';
import { useEffect, useState } from 'react';

export default function SearchBox() {
  const { currentOption, searchOptionState, setCurrentOption } = useSearchStore(
    (state) => state
  );
  const [hydrated, setHydration] = useState(false);

  useEffect(() => {
    setHydration(true);
  }, []);
  return (
    <div className='py-3 lg:col-start-4 lg:col-span-6 md:col-start-2 md:col-span-6 col-span-full w-full z-50'>
      {hydrated && (
        <>
          <div className='flex mx-auto space-x-2 text-lg uppercase font-bold'>
            {searchOptionState.map((optionState, index) => (
              <OptionSwitchButton
                key={index}
                index={index}
                trigger={() => setCurrentOption(index)}
                active={index === currentOption}
              >
                {searchOptionData[optionState.searchOption].content}
              </OptionSwitchButton>
            ))}
          </div>

          <div className='flex w-full flex-col md:flex-row space-x-0'>
            {searchOptionState[currentOption].searchOption ===
              SearchOption.LOCATION && <LocationSearchBox />}
            {searchOptionState[currentOption].searchOption ===
              SearchOption.TYPE && <TypeSearchBox />}
            {searchOptionState[currentOption].searchOption ===
              SearchOption.TERM && <TermSearchBox />}
          </div>
          <SearchButton />
        </>
      )}
    </div>
  );
}
