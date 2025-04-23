import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTenantAttributes } from "@/hook/tenant.hook";
import { UserAttributeUpdateInput, UserAttributeInput } from "@/lib/data-type";
import { useAuthStore, UserAttributes } from "@/store/auth-store";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLandlordAttributes } from "@/hook/landlord.hook";
import { Role } from "@/lib/contanst";

// Define Zod schema for form validation
const profileFormSchema = z.object({
  FIRSTNAME: z.string().min(1, "First name is required"),
  MIDDLENAME: z.string().optional(),
  LASTNAME: z.string().min(1, "Last name is required"),
  TEL: z.string().min(1, "Phone number is required"),
  BIRTHDAY: z.string().refine((val) => !isNaN(dayjs(val).valueOf()), {
    message: "Invalid date",
  }),
  GENDER: z.enum(["male", "female", "other", "UNKNOWN"]),
  COUNTRY: z.string().min(1, "Country is required"),
});

export interface ProfileEditFormParams {
  onChangeProfile: () => Promise<void>;
  role: Role;
}

export default function ProfileEditForm({
  onChangeProfile,
  role,
}: ProfileEditFormParams) {
  const { updateTenantAttr, createTenantAttr, statusTenantAttr } =
    useTenantAttributes();
  const { updateLandlordAttr, createLandlordAttr, statusLandlordAttr } =
    useLandlordAttributes();
  const { userAttributes } = useAuthStore((state) => state);
  const [displayForm, setDisplayForm] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      FIRSTNAME: userAttributes.FIRSTNAME?.value || "",
      MIDDLENAME: userAttributes.MIDDLENAME?.value || "",
      LASTNAME: userAttributes.LASTNAME?.value || "",
      TEL: userAttributes.TEL?.value || "",
      BIRTHDAY: userAttributes.BIRTHDAY?.value
        ? dayjs(Number(userAttributes.BIRTHDAY.value)).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
      GENDER:
        (userAttributes.GENDER?.value as "male" | "female" | "other") ||
        "UNKNOWN",
      COUNTRY: userAttributes.COUNTRY?.value || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    const changedFields: UserAttributeUpdateInput[] = [];
    const newFields: UserAttributeInput[] = [];

    // Prepare data for submission
    Object.entries(values).forEach(([key, value]) => {
      const attributeName = key as keyof UserAttributes;
      const attribute = userAttributes[attributeName];

      if (attribute?.id) {
        changedFields.push({
          id: attribute.id,
          value:
            key === "BIRTHDAY"
              ? dayjs(value).valueOf().toString()
              : value.toString(),
        });
      } else {
        newFields.push({
          name: attributeName,
          value:
            key === "BIRTHDAY"
              ? dayjs(value).valueOf().toString()
              : value.toString(),
        });
      }
    });

    try {
      if (changedFields.length > 0) {
        switch (role) {
          case Role.tenant: {
            await updateTenantAttr(changedFields);
            break;
          }
          case Role.landlord: {
            await updateLandlordAttr(changedFields);
            break;
          }
        }
      }
      if (newFields.length > 0) {
        switch (role) {
          case Role.landlord: {
            await createLandlordAttr(newFields);
            break;
          }
          case Role.tenant: {
            await createTenantAttr(newFields);
            break;
          }
        }
      }
      await onChangeProfile();
      setDisplayForm(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Dialog open={displayForm} onOpenChange={setDisplayForm}>
      <DialogTrigger asChild>
        <Button className="mt-4">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="FIRSTNAME"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="MIDDLENAME"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="LASTNAME"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="TEL"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="BIRTHDAY"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="GENDER"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="COUNTRY"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDisplayForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  statusTenantAttr.anyLoading && statusLandlordAttr.anyLoading
                }
              >
                {(statusTenantAttr.anyLoading &&
                  statusLandlordAttr.anyLoading &&
                  "Loading...") ||
                  "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
