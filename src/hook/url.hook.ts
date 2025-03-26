import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchStore } from "@/store/search-store";
import { TermUnit, PlaceType, SearchOption } from "@/lib/contanst";

export const useParamsUrlHandler = () => {
  const {
    result,
    location,
    setType,
    setLocation,
    setTerm,
    setSelectedDate,
    handleSearch,
  } = useSearchStore((state) => state);
  const [firstLoad, setFirstLoad] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (result.length == 0 && location.city == "") {
      {
        const paramCity = searchParams.get("ci");
        const paramCountry = searchParams.get("co");
        const paramTerm = searchParams.get("t");
        const paramType = searchParams.get("ty");

        if (paramCity && paramCountry) {
          setLocation({ city: paramCity, country: paramCountry });
          handleSearch({
            searchOption: SearchOption.LOCATION,
            valid: true,
          });
        }
        if (paramTerm && paramType) {
          setTerm(paramTerm as TermUnit);
          setType(paramType as PlaceType);

          if (paramTerm == TermUnit.DAY || paramTerm == TermUnit.HOUR) {
            const paramStart = searchParams.get("s");
            const paramEnd = searchParams.get("e");
            if (paramStart && paramEnd) {
              setSelectedDate({
                start: Number(paramStart),
                end: Number(paramEnd),
              });
            }
          } else {
            handleSearch({ searchOption: SearchOption.LOCATION, valid: true });
          }
        }
      }
      setFirstLoad(true);
    }
  }, []);
  return { firstLoad };
};
