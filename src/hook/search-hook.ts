import { useSearchStore } from "@/store/search-store";
import {
  Facilities,
  Operator,
  Order,
  SortOptions,
  TermUnit,
} from "@/lib/contanst";
import { QueryCondition, QueryOrder } from "@/lib/data-type";
import { QUERY_PLACES_ID } from "@/lib/gql/endpoint";
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
    filter,
    selectedDate,
    handleSearch,
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
    var sortBy: QueryOrder[] = [];
    if (sort.price != SortOptions.price.default) {
      var priceBy: string | null;
      var order: Order;
      switch (term) {
        case TermUnit.DAY:
          priceBy = "PRICE_BY_DAY";
          break;
        case TermUnit.HOUR:
          priceBy = "PRICE_BY_HOUR";
          break;
        case TermUnit.MONTH:
          priceBy = "PRICE_BY_MONTH";
          break;
        case TermUnit.WEEK:
          priceBy = "PRICE_BY_WEEK";
          break;
        default:
          priceBy = null;
          break;
      }
      switch (sort.price) {
        case SortOptions.price.expensive:
          order = Order.desc;
          break;
        case SortOptions.price.cheap:
          order = Order.asc;
          break;
        default:
          order = Order.asc;
      }
      const newSort: QueryOrder = {
        attributeName: priceBy,
        by: "attributes.valueNumber",
        order: order,
      };
      sortBy.push(newSort);
    }
    if (sort.area != SortOptions.area.default) {
      var order: Order;
      switch (sort.area) {
        case SortOptions.area.big_area:
          order = Order.desc;
          break;
        case SortOptions.area.small_area:
          order = Order.asc;
          break;
        default:
          order = Order.asc;
      }
      const newSort: QueryOrder = {
        attributeName: null,
        by: "area",
        order: order,
      };
      sortBy.push(newSort);
    }
    if (sort.position != SortOptions.position.default) {
      var order: Order;
      switch (sort.area) {
        case SortOptions.area.big_area:
          order = Order.desc;
          break;
        case SortOptions.area.small_area:
          order = Order.asc;
          break;
        default:
          order = Order.asc;
      }
      const newSort: QueryOrder = {
        attributeName: null,
        by: "distanceFromCenter",
        order: order,
      };
      sortBy.push(newSort);
    }
    if (sort.highNumberOfGuest) {
      const newSort: QueryOrder = {
        attributeName: "MAX_GUEST",
        by: "attributes.valueNumber",
        order: Order.desc,
      };
      sortBy.push(newSort);
    }
    if (sort.rating) {
      const newSort: QueryOrder = {
        attributeName: null,
        by: "rating",
        order: Order.desc,
      };
      sortBy.push(newSort);
    }
    return sortBy;
  };

  const handleFilter = () => {
    const filterList: QueryCondition[] = [];

    filter.forEach((value) => {
      filterList.push({
        attributeName: value,
        operator: Operator.EQUAL,
        key: "attribute.name",
        value: Facilities[value as keyof typeof Facilities],
      });
    });

    return filterList;
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const conditions = handleCondition();
  const filterList = handleFilter();
  const sortBy = handleSortBy();

  const [search] = useLazyQuery(QUERY_PLACES_ID, {
    onCompleted: (data) => {
      console.log(data);
      if (data.getPlaces.length >= 0) {
        const result = data.getPlaces.map((record: any) => record.id);
        setResult(result);
        handleSearch(undefined);
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
      setResult([]);
      console.log(conditions, sortBy);
      setPagination({ take: 30, skip: 0 });
      search({
        variables: {
          queryManyInput: {
            conditions: [...conditions, ...filterList],
            pagination: pagination,
            orderBy: sortBy,
            selectedDate:
              term == TermUnit.DAY || term == TermUnit.HOUR
                ? selectedDate
                : undefined,
          },
        },
      });
    }
  };

  return { searchPlaces, loading, error };
};
