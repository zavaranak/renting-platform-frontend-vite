import { useSearchStore } from "@store/search-store";
import { SideBox } from "@components/side_box/side-box";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import clsx from "clsx";
import { useState } from "react";
import { Facilities, Purpose } from "@lib/contanst";
import { Checkbox, FormControlLabel } from "@mui/material";

export const FilterBox = () => {
  const [openSortBox, setOpenSortBox] = useState(false);
  const { term, type, location, purpose } = useSearchStore((state) => state);
  const { handleSubmit, control, register } = useForm({});
  const submitSearch: SubmitHandler<any> = () => {};

  return (
    // <div className="bg-text_light_panel">
    <SideBox>
      <form
        className="flex flex-col gap-3 p-3"
        onSubmit={handleSubmit(submitSearch)}
      >
        <label className="flex gap-3">
          <p>Location</p>
          <input
            {...register("city", {
              required: {
                value: true,
                message: "city is required",
              },
            })}
            defaultValue={location.city}
            placeholder={"City"}
          />
        </label>
        <label className="flex gap-3">
          <p>Purpose</p>
          <select {...register("purpose")}>
            {Object.values(Purpose).map((value) => (
              <option defaultChecked={value == purpose} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-3">
          <label className="flex">
            <p>Type</p>
            <select {...register("type")}>
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
          </label>
          <label className="flex">
            <p>Term</p>
            <select {...register("term", {})}>
              <option value="male">male</option>
              <option value="female">female</option>
              <option selected value="other">
                other
              </option>
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-3 relative">
          <p
            onClick={(e) => {
              e.stopPropagation();
              setOpenSortBox((state) => !state);
            }}
          >
            Sort by
          </p>

          <div
            className={clsx(
              "flex flex-col",
              openSortBox ? "visible" : "invisible"
            )}
          >
            <label className="grid grid-cols-2 gap-1">
              Price
              <select {...register("priceSort", {})}>
                <option selected value="price (high)">
                  skip
                </option>
                <option value="price (high)">from expensive</option>
                <option value="price (high)">from cheap</option>
              </select>
            </label>
            <label className="grid grid-cols-2 gap-1">
              Position
              <select {...register("positionSort", {})}>
                <option selected value="price (high)">
                  skip
                </option>
                <option value="price (high)">far center</option>
                <option value="price (high)">near center</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <p>Filter</p>
          <div className="flex flex-col h-52 overflow-y-scroll">
            {Object.values(Facilities).map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Controller
                    name="sort2"
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value.includes(option)}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...value, option]
                            : value.filter((v: any) => v !== option);
                          onChange(newValue);
                        }}
                      />
                    )}
                  />
                }
                label={option}
              />
            ))}
          </div>
        </div>
        {/* {(true && <>Loading</>) || ( */}
        <input
          className="w-full uppercase text-center m-auto cursor-pointer"
          disabled={false}
          type="submit"
          value={"FIND"}
        />
        {/* )} */}
      </form>
    </SideBox>
    // </div>
  );
};
