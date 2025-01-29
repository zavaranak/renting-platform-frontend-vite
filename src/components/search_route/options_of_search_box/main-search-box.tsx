import { useSearchStore } from "@/store/search-store";
import { TermUnit } from "@/lib/contanst";
import TypeSearchBox from "./type-search-box";
import { DatePickerWithRange } from "./range-picker-box";
import { HourPicker } from "./hour-picker-box";
import LocationSearchBox from "./location-search-box";

export default function MainSearchBox() {
  const { term } = useSearchStore((state) => state);

  return (
    <div className="w-full flex flex-col border-2 border-neutral_brown border-b-transparent p-5">
      <LocationSearchBox />
      {term == TermUnit.DAY && <DatePickerWithRange />}
      {term == TermUnit.HOUR && <HourPicker />}
      <TypeSearchBox />
    </div>
  );
}
