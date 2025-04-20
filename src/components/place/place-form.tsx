import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Place,
  PlaceInputSchema,
  PlaceUpdateInputSchema,
} from "@/lib/data-type";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  LivingPlaceType,
  Purpose,
  PurposeSchema,
  TermUnit,
  WorkingPlaceType,
} from "@/lib/contanst";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import clsx from "clsx";
import { useCreatePlace, useUpdatePlace } from "@/hook/place.hook";
import { useAuthStore } from "@/store/auth-store";

interface PlaceFormParams {
  refreshDashboard: () => void;
}

export function PlaceForm({ refreshDashboard }: PlaceFormParams) {
  const { user } = useAuthStore((state) => state);
  const [displayForm, setDisplayForm] = useState(false);
  const [purpose, setPurpose] = useState<Purpose>(Purpose.LIVING);
  const { createPlace } = useCreatePlace();
  const PlaceCreateFormSchema = PlaceInputSchema.extend({
    purpose: PurposeSchema,
  });

  const form = useForm<z.infer<typeof PlaceCreateFormSchema>>({
    defaultValues: {
      name: "",
      country: "",
      city: "",
      address: "",
      termUnit: [TermUnit.MONTH],
      type: [],
      purpose: Purpose.LIVING,
      area: 0,
      distanceFromCenter: 0,
      landlordId: user?.id,
    },
  });

  const handleSubmit = async (
    values: z.infer<typeof PlaceCreateFormSchema>
  ) => {
    try {
      const { purpose, ...input } = values;
      const { success } = await createPlace(input);

      if (success) {
        refreshDashboard();
        setDisplayForm(false);
        setTimeout(() => alert("created new place"), 20);
      }
    } catch (error) {
      // Error is already handled in useCreatePlace
      console.error("Submission error:", error);
    }
  };

  return (
    <Dialog open={displayForm} onOpenChange={setDisplayForm}>
      <DialogTrigger asChild>
        <Button className="mt-4">Add new place</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add new place</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">Place name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">
                    Area (m<sup>2</sup>)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distanceFromCenter"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">
                    Distance from city's center (km)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-center items-center">
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem className="flex gap-2">
                    {/* <FormLabel className=" ">Purpose</FormLabel> */}
                    <Select
                      onValueChange={(value: Purpose) => {
                        field.onChange(value);
                        setPurpose(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(Purpose).map((p) => (
                          <SelectItem key={p[0]} value={p[1]}>
                            {p[1]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FormLabel
                    className={clsx(
                      "flex items-center justify-between w-full p-[8px] border rounded-md bg-background text-sm",
                      "hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
                    )}
                  >
                    Select Place's types
                  </FormLabel>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <FormField
                    control={form.control}
                    name="type"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            {purpose === Purpose.LIVING
                              ? "Living Types"
                              : "Business Types"}
                          </FormLabel>
                        </div>
                        {purpose === Purpose.LIVING
                          ? Object.values(LivingPlaceType).map((item) => (
                              <FormField
                                key={item}
                                control={form.control}
                                name="type"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {item}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))
                          : Object.values(WorkingPlaceType).map((item) => (
                              <FormField
                                key={item}
                                control={form.control}
                                name="type"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {item}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                      </FormItem>
                    )}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FormLabel
                    className={clsx(
                      "flex items-center justify-between w-full p-[8px] border rounded-md bg-background text-sm",
                      "hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
                    )}
                  >
                    Select Place's terms
                  </FormLabel>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <FormField
                    control={form.control}
                    name="termUnit"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Renting terms
                          </FormLabel>
                        </div>
                        {Object.values(TermUnit).map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="termUnit"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </FormItem>
                    )}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface PlaceUpdateFormParams {
  place: Place;
  setPlace: (p: Place | undefined) => void;
  refreshDashboard: () => void;
}
export function PlaceUpdateForm({
  place,
  setPlace,
  refreshDashboard,
}: PlaceUpdateFormParams) {
  const [displayForm, setDisplayForm] = useState(place != undefined);
  const [purpose, setPurpose] = useState<Purpose>(Purpose.LIVING);
  const PlaceUpdateFormSchema = PlaceUpdateInputSchema.extend({
    purpose: PurposeSchema,
  });
  const { updatePlace } = useUpdatePlace();
  const getDefaultValues = () => {
    if (!place) return { purpose: Purpose.LIVING };

    // Extract only the fields that exist in the update schema
    const updateFields = PlaceUpdateInputSchema.keyof().options;
    const baseValues = updateFields.reduce((acc, key) => {
      if (key in place) {
        return { ...acc, [key]: place[key] };
      }
      return acc;
    }, {});

    return {
      ...baseValues,
      purpose: Purpose.LIVING,
    };
  };

  const form = useForm<z.infer<typeof PlaceUpdateFormSchema>>({
    defaultValues: getDefaultValues(),
  });

  const handleSubmit = async (
    values: z.infer<typeof PlaceUpdateFormSchema>
  ) => {
    const { purpose, ...input } = values;
    const { success } = await updatePlace(input);
    if (success) {
      refreshDashboard();
      setDisplayForm(false);
    }
  };
  useEffect(() => {
    if (place != undefined) {
      console.log(place);
      setDisplayForm(true);
      getDefaultValues();
    }
  }, [place]);

  return (
    <Dialog
      open={displayForm}
      onOpenChange={(open) => {
        setPlace(undefined);
        setDisplayForm(open);
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>update place</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">Place name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">
                    Area (m<sup>2</sup>)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distanceFromCenter"
              render={({ field }) => (
                <FormItem className="flex  gap-2 justify-center items-center">
                  <FormLabel className="w-20">
                    Distance from city's center (km)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-center items-center">
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem className="flex gap-2">
                    {/* <FormLabel className=" ">Purpose</FormLabel> */}
                    <Select
                      onValueChange={(value: Purpose) => {
                        field.onChange(value);
                        setPurpose(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(Purpose).map((p) => (
                          <SelectItem key={p[0]} value={p[1]}>
                            {p[1]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FormLabel
                    className={clsx(
                      "flex items-center justify-between w-full p-[8px] border rounded-md bg-background text-sm",
                      "hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
                    )}
                  >
                    Select Place's types
                  </FormLabel>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <FormField
                    control={form.control}
                    name="type"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            {purpose === Purpose.LIVING
                              ? "Living Types"
                              : "Business Types"}
                          </FormLabel>
                        </div>
                        {purpose === Purpose.LIVING
                          ? Object.values(LivingPlaceType).map((item) => (
                              <FormField
                                key={item}
                                control={form.control}
                                name="type"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {item}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))
                          : Object.values(WorkingPlaceType).map((item) => (
                              <FormField
                                key={item}
                                control={form.control}
                                name="type"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {item}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                      </FormItem>
                    )}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FormLabel
                    className={clsx(
                      "flex items-center justify-between w-full p-[8px] border rounded-md bg-background text-sm",
                      "hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
                    )}
                  >
                    Select Place's terms
                  </FormLabel>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <FormField
                    control={form.control}
                    name="termUnit"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Renting terms
                          </FormLabel>
                        </div>
                        {Object.values(TermUnit).map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="termUnit"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </FormItem>
                    )}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
