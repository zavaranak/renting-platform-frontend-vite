import { useSearchStore } from "@store/search-store";
import { SideBox } from "@components/side_box/side-box";

export const FilterBox = () => {
  const { term, type } = useSearchStore((state) => state);
  return (
    // <div className="bg-text_light_panel">
    <SideBox>
      <div className="p-3">Type: {type}</div>
      <div className="p-3">Term: {term}</div>
    </SideBox>
    // </div>
  );
};
