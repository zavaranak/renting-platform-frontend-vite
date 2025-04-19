import { zodResolver } from "@hookform/resolvers/zod";
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

import { PlaceInput } from "@/lib/data-type";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlaceStatus, TermUnit } from "@/lib/contanst";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Define Zod schema for form validation

interface PlaceFormParams {}

export default function PlaceForm() {
  const [displayForm, setDisplayForm] = useState(false);

  const form = useForm<PlaceInput>({
    defaultValues: {
      name: "",
      country: "",
      city: "",
      address: "",
      termUnit: [TermUnit.MONTH],
      type: [],
      area: 0,
      status: PlaceStatus.FOR_RENT,
    },
  });

  const handleSubmit = (values: PlaceInput) => {
    console.log("Form submitted with values:", values);
    setDisplayForm(false);
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
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>select type</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>{...field.value}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={false}
                        onCheckedChange={() => {}}
                      >
                        Status Bar
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={false}
                        onCheckedChange={() => {}}
                        disabled
                      >
                        Activity Bar
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={false}
                        onCheckedChange={() => {}}
                      >
                        Panel
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormItem>
              )}
            />
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
