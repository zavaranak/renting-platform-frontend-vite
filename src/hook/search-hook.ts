import { useSearchStore } from "@store/search-store";
import { Operator, SortOptions } from "@lib/contanst";
import { QueryCondition } from "@lib/data-type";
import { QUERY_PLACES_ID } from "@lib/gql/endpoint";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSearchPlaces = () => {
  const {
    location,
    type,
    term,
    canSearch,
    pagination,
    sort,
    setPagination,
    setResult,
  } = useSearchStore((state) => state);
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

  const handleSortBy = () => {
    const sortBy = [];
    if (sort.price != SortOptions.price.default) {
    }
    if (sort.area != SortOptions.area.default) {
    }
    if (sort.position != SortOptions.position.default) {
    }
    if (sort.highNumberOfGuest) {
    }
    if (sort.rating) {
    }
    return [];
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const conditions = handleCondition();
  const sortBy = handleSortBy();

  const [search] = useLazyQuery(QUERY_PLACES_ID, {
    onCompleted: (data) => {
      console.log(data);
      if (data.getPlaces.length > 0) {
        const result = data.getPlaces.map((record: any) => record.id);
        setResult(result);
        navigate("/search");
      }
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
          queryManyInput: {
            conditions: conditions,
            pagination: pagination,
            sortBy: sortBy,
          },
        },
      });
    }
  };

  return { searchPlaces, loading, error };
};
