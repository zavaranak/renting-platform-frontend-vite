import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlaceSchema, PlaceAttribute } from "@/lib/data-type";
import {
  PlaceAttributeName,
  PlaceAttributeNameSchema,
  PlaceStatus,
  PlaceStatusSchema,
  TermUnitSchema,
  WorkingPlaceTypeSchema,
} from "@/lib/contanst";
import { DialogTrigger, Dialog, DialogContent } from "../ui/dialog";

export function PlaceForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: z.infer<typeof PlaceSchema>) => void;
  initialData?: Partial<z.infer<typeof PlaceSchema>>;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<z.infer<typeof PlaceSchema>>({
    resolver: zodResolver(PlaceSchema),
    defaultValues: initialData || {
      type: [],
      termUnit: [],
      attributes: [],
      photos: [],
      status: PlaceStatus.FOR_RENT, // Default status
    },
  });

  const addAttribute = () => {
    const newAttribute: PlaceAttribute = {
      id: crypto.randomUUID(),
      name: PlaceAttributeName.PRICE_BY_DAY,
      value: "",
      valueNumber: null,
    };
    setValue("attributes", [...watch("attributes"), newAttribute]);
  };

  const removeAttribute = (index: number) => {
    const currentAttributes = watch("attributes");
    setValue(
      "attributes",
      currentAttributes.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog>
      <DialogTrigger>Add place</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Name</label>
              <input {...register("name")} />
              {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div>
              <label>Address</label>
              <input {...register("address")} />
              {errors.address && <span>{errors.address.message}</span>}
            </div>

            <div>
              <label>City</label>
              <input {...register("city")} />
              {errors.city && <span>{errors.city.message}</span>}
            </div>

            <div>
              <label>Country</label>
              <input {...register("country")} />
              {errors.country && <span>{errors.country.message}</span>}
            </div>

            <div>
              <label>Area (m²)</label>
              <input
                type="number"
                {...register("area", { valueAsNumber: true })}
              />
              {errors.area && <span>{errors.area.message}</span>}
            </div>

            <div>
              <label>Distance from Center (km)</label>
              <input
                type="number"
                {...register("distanceFromCenter", { valueAsNumber: true })}
              />
              {errors.distanceFromCenter && (
                <span>{errors.distanceFromCenter.message}</span>
              )}
            </div>
          </div>

          {/* Type (Multi-select) */}
          <div>
            <label>Place Type</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(WorkingPlaceTypeSchema).map((type) => (
                <label key={type} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={type}
                    checked={watch("type")?.includes(type)}
                    onChange={(e) => {
                      const currentTypes = watch("type") || [];
                      if (e.target.checked) {
                        setValue("type", [...currentTypes, type]);
                      } else {
                        setValue(
                          "type",
                          currentTypes.filter((t) => t !== type)
                        );
                      }
                    }}
                  />
                  {type}
                </label>
              ))}
            </div>
            {errors.type && <span>{errors.type.message}</span>}
          </div>

          {/* Term Unit (Multi-select) */}
          <div>
            <label>Available Term Units</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(TermUnitSchema).map((unit) => (
                <label key={unit} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={unit}
                    checked={watch("termUnit")?.includes(unit)}
                    onChange={(e) => {
                      const currentUnits = watch("termUnit") || [];
                      if (e.target.checked) {
                        setValue("termUnit", [...currentUnits, unit]);
                      } else {
                        setValue(
                          "termUnit",
                          currentUnits.filter((u) => u !== unit)
                        );
                      }
                    }}
                  />
                  {unit}
                </label>
              ))}
            </div>
            {errors.termUnit && <span>{errors.termUnit.message}</span>}
          </div>

          {/* Status */}
          <div>
            <label>Status</label>
            <select {...register("status")}>
              {Object.values(PlaceStatusSchema).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && <span>{errors.status.message}</span>}
          </div>

          {/* Attributes */}
          <div>
            <label>Attributes</label>
            <button type="button" onClick={addAttribute}>
              Add Attribute
            </button>

            {watch("attributes")?.map((attr, index) => (
              <div key={attr.id} className="flex gap-2 items-center">
                <select
                  {...register(`attributes.${index}.name`)}
                  defaultValue={attr.name}
                >
                  {Object.values(PlaceAttributeNameSchema).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                <input
                  {...register(`attributes.${index}.value`)}
                  placeholder="Value"
                />

                <input
                  type="number"
                  {...register(`attributes.${index}.valueNumber`, {
                    valueAsNumber: true,
                  })}
                  placeholder="Numeric value (optional)"
                />

                <button type="button" onClick={() => removeAttribute(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Photos */}
          <div>
            <label>Photos</label>
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const photoUrls = files.map((file) =>
                  URL.createObjectURL(file)
                );
                setValue("photos", [...(watch("photos") || []), ...photoUrls]);
              }}
            />
            <div className="flex flex-wrap gap-2">
              {watch("photos")?.map((photo, index) => (
                <div key={index} className="relative">
                  <img src={photo} alt="" className="h-20 w-20 object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setValue(
                        "photos",
                        watch("photos")?.filter((_, i) => i !== index) || []
                      );
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
