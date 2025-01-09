import { useSearchStore } from "@store/search-store";
import { Operator, QueryCondition } from "../lib/contanst";
import { PLACES } from "@lib/gql/endpoint";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";

export const useSearchPlaces = () => {
  const { location, type, term, canSearch, pagination, setPagination } =
    useSearchStore((state) => state);
  const handleCondition = () => {
    const conditions: QueryCondition[] = [];
    if (location.city && location.country) {
      const locations: QueryCondition[] = [
        {
          value: location.city,
          key: "city",
          operator: Operator.EQUAL,
        },
        {
          value: location.country,
          key: "country",
          operator: Operator.EQUAL,
        },
      ];
      conditions.push(...locations);
    }
    if (type != "") {
      conditions.push({
        value: type,
        key: "type",
        operator: Operator.INCLUDE,
      });
    }

    if (term != "") {
      conditions.push({
        value: term,
        key: "termUnit",
        operator: Operator.INCLUDE,
      });
    }
    // if (guest.adults > 0) {
    //   conditions.push({
    //     value: (guest.adults + guest.children / 2).toString(),
    //     key: "guest",
    //     operator: Operator.INCLUDE,
    //   });
    // }
    return conditions;
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const conditions = handleCondition();

  const [search] = useLazyQuery(PLACES, {
    onCompleted: (data) => {
      console.log(data);
      setLoading(false);
    },
    onError: (err) => {
      console.error(err);
      setError(err.message);
      setLoading(false);
    },
  });
  const searchPlaces = () => {
    if (canSearch) {
      setPagination({ take: 20, skip: 0 });
      search({
        variables: {
          queryManyInput: { conditions: conditions, pagination: pagination },
        },
      });
    }
  };

  return { searchPlaces, loading, error };
};
