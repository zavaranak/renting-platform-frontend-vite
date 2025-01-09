"use client";
import { create } from "zustand";
import {
  livingPlaceType,
  Purpose,
  QueryPagination,
  SearchOption,
  TermUnit,
  workingPlaceType,
} from "../lib/contanst";

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

export type SearchStoreState = {
  countries: string[];
  cities: string[];
  purpose: Purpose | "";
  type: livingPlaceType | workingPlaceType | "";
  term: TermUnit | "";
  location: LocationParam;
  guest: GuestParam;
  currentOption: number;
  searchOptionState: SearchOptionState[];
  canSearch: boolean;
  pagination: QueryPagination;
};

export type SearchStoreAction = {
  setCountries: (data: string[]) => void;
  setCities: (data: string[]) => void;
  addOption: (newOption: SearchOption) => void;
  setCurrentOption: (optionIndex: number) => void;
  setGuest: (guest: GuestParam) => void;
  setLocation: (location: LocationParam) => void;
  setType: (type: livingPlaceType | workingPlaceType | "") => void;
  setTerm: (term: TermUnit) => void;
  setPurpose: (purpose: Purpose) => void;
  handleSearch: (optionState: SearchOptionState) => void;
  setPagination: (data: QueryPagination) => void;
};

export type SearchStore = SearchStoreState & SearchStoreAction;

export const initialSearchOptionState: SearchOptionState[] = [
  {
    searchOption: SearchOption.LOCATION,
    valid: false,
  },
  {
    searchOption: SearchOption.TYPE,
    valid: false,
  },
  {
    searchOption: SearchOption.TERM,
    valid: false,
  },
];
export const useSearchStore = create<SearchStore>((set) => ({
  purpose: "",
  type: "",
  term: "",
  location: {
    city: "",
    country: "",
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
  setType: (type: workingPlaceType | livingPlaceType | "") => {
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
}));
