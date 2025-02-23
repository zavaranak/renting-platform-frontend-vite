"use client";
import { create } from "zustand";
import {
  livingPlaceType,
  PlaceType,
  Purpose,
  SearchOption,
  SortOptions,
  TermUnit,
  workingPlaceType,
} from "@/lib/contanst";

import { QueryPagination, SelectedDate } from "@/lib/data-type";
export type SearchOptionState = {
  searchOption: SearchOption;
  valid: boolean;
};

export type GuestParam = {
  adults: number;
  children: number;
};

export type LocationParam = {
  country: string;
  city: string;
};

export interface SortOptionsInterface {
  price: string;
  area: string;
  position: string;
  rating: boolean;
  highNumberOfGuest: boolean;
}
export type SearchStoreState = {
  selectedDate: SelectedDate | undefined;
  countries: string[];
  cities: string[];
  purpose: Purpose | "";
  type: livingPlaceType | workingPlaceType | PlaceType | "";
  term: TermUnit;
  location: LocationParam;
  guest: GuestParam;
  currentOption: number;
  searchOptionState: SearchOptionState[];
  canSearch: boolean;
  pagination: QueryPagination;
  sort: SortOptionsInterface;
  filter: string[];
  result: [];
};

export type SearchStoreAction = {
  setCountries: (data: string[]) => void;
  setCities: (data: string[]) => void;
  addOption: (newOption: SearchOption) => void;
  setCurrentOption: (optionIndex: number) => void;
  setGuest: (guest: GuestParam) => void;
  setLocation: (location: LocationParam) => void;
  setType: (type: livingPlaceType | workingPlaceType | PlaceType | "") => void;
  setTerm: (term: TermUnit) => void;
  setPurpose: (purpose: Purpose) => void;
  handleSearch: (optionState?: SearchOptionState) => void;
  setPagination: (data: QueryPagination) => void;
  setResult: (data: string[]) => void;
  setSort: (data: SortOptionsInterface) => void;
  setFilter: (data: string[]) => void;
  setSelectedDate: (data: SelectedDate | undefined) => void;
};

export type SearchStore = SearchStoreState & SearchStoreAction;

export const initialSearchOptionState: SearchOptionState[] = [
  {
    searchOption: SearchOption.LOCATION,
    valid: false,
  },
  {
    searchOption: SearchOption.TYPE,
    valid: true,
  },
  {
    searchOption: SearchOption.SORT,
    valid: true,
  },
];
export const useSearchStore = create<SearchStore>((set) => ({
  purpose: Purpose.LIVING,
  type: livingPlaceType.HOUSE,
  term: TermUnit.DAY,
  filter: [],
  location: {
    city: "",
    country: "vietnam",
  },
  guest: {
    adults: 1,
    children: 0,
  },
  currentOption: 0,
  searchOptionState: initialSearchOptionState,
  canSearch: false,
  cities: [],
  countries: [],
  pagination: {
    skip: 0,
    take: 20,
  },
  sort: {
    price: SortOptions.price.default,
    area: SortOptions.area.default,
    position: SortOptions.position.default,
    rating: false,
    highNumberOfGuest: false,
  },
  selectedDate: undefined,
  result: [],
  addOption: (newOption: SearchOption) =>
    set((state: SearchStoreState) => {
      const newSearchOption: SearchOptionState = {
        searchOption: newOption,
        valid: false,
      };
      return {
        searchOptionState: [...state.searchOptionState, newSearchOption],
      };
    }),
  handleSearch: (optionState?: SearchOptionState) =>
    set((state: SearchStoreState) => {
      if (optionState == undefined) {
        return {
          searchOptionState: initialSearchOptionState,
          canSearch: false,
        };
      }
      let checkCanSearch: boolean = true;
      const newState = state.searchOptionState.map((option) => {
        if (
          !option.valid &&
          checkCanSearch &&
          option.searchOption !== optionState?.searchOption
        ) {
          checkCanSearch = false;
        }
        if (optionState && option.searchOption === optionState.searchOption) {
          return {
            searchOption: optionState.searchOption,
            valid: optionState.valid,
          };
        } else {
          return option;
        }
      });
      if (optionState)
        return {
          searchOptionState: newState,
          canSearch: checkCanSearch && optionState.valid,
        };
      else {
        return {
          canSearch: checkCanSearch,
        };
      }
    }),
  setCurrentOption: (optionIndex: number) =>
    set(() => ({
      currentOption: optionIndex,
    })),
  setGuest: (guest: GuestParam) => {
    set(() => ({
      guest: guest,
    }));
  },
  setLocation: (location: LocationParam) => {
    set(() => ({
      location: {
        city: location.city.toLowerCase(),
        country: location.country.toLowerCase(),
      },
    }));
  },
  setTerm: (term: TermUnit) => {
    set(() => ({
      term: term,
    }));
  },
  setPurpose: (purpose: Purpose) => {
    set(() => ({
      purpose: purpose,
    }));
  },
  setType: (type: workingPlaceType | livingPlaceType | PlaceType | "") => {
    set(() => ({
      type: type,
    }));
  },
  setCities: (data: string[]) => {
    set(() => ({
      cities: data,
    }));
  },
  setCountries: (data: string[]) => {
    set(() => ({
      countries: data,
    }));
  },
  setPagination: (data: QueryPagination) => {
    set(() => ({
      pagination: data,
    }));
  },
  setResult: (data: any) => {
    set(() => ({ result: data }));
  },
  setSort: (data: SortOptionsInterface) => {
    set(() => ({ sort: data }));
  },
  setFilter: (data: string[]) => {
    set(() => ({ filter: data }));
  },
  setSelectedDate(data) {
    set(() => ({ selectedDate: data }));
  },
  // setMap: (map: Map<string, string[]>) => {
  //   set(() => ({
  //     locationMap: map,
  //   }));
  // },
}));
