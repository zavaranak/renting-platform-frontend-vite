import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTenantAttributes } from "@/hook/tenant.hook";
import { AttributeUpdateInput, TenantAttributeInput } from "@/lib/data-type";

import { useAuthStore, UserAttributes } from "@/store/auth-store";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { useState } from "react";

export interface ProfileEditFormParams {
  onChangeProfile: () => Promise<void>;
}

export default function ProfileEditForm(params: ProfileEditFormParams) {
  const { updateTenantAttr, createTenantAttr, loading } = useTenantAttributes();
  const { userAttributes } = useAuthStore((state) => state);
  const [displayForm, setDisplayForm] = useState(false);
  const [formData, setFormData] = useState<UserAttributes>(userAttributes);
  const [changedFields, setChangedFields] = useState<AttributeUpdateInput[]>(
    []
  );
  const [newFields, setNewFields] = useState<TenantAttributeInput[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (changedFields.length > 0 && newFields.length > 0) {
      await Promise.all([
        updateTenantAttr(changedFields),
        createTenantAttr(newFields),
      ]);
    } else if (changedFields.length > 0 && newFields.length == 0) {
      await updateTenantAttr(changedFields);
    } else if (changedFields.length == 0 && newFields.length > 0) {
      await createTenantAttr(newFields);
    }
    params.onChangeProfile();
    setDisplayForm(false);
  };

  const handleInputChange = (
    attributeName: keyof UserAttributes,
    value: string,
    id: string
  ) => {
    if (id == "") {
      setNewFields((prev) => {
        const fieldIndex = prev.findIndex(
          (field) => field.name == attributeName
        );
        if (fieldIndex != -1) {
          prev[fieldIndex].value = value;
        } else {
          prev.push({
            name: attributeName,
            value: value,
          });
        }
        return prev;
      });
    } else {
      setChangedFields((prev) => {
        const fieldIndex = prev.findIndex((field) => field.id == id);
        if (fieldIndex != -1) {
          prev[fieldIndex].value = value;
        } else {
          prev.push({
            id: id,
            value: value,
            valueNumber: undefined,
          });
        }
        return prev;
      });
    }
    setFormData((prev) => ({
      ...prev,
      [attributeName]: { ...prev[attributeName], value },
    }));
  };

  return (
    <Dialog open={displayForm} onOpenChange={setDisplayForm}>
      <DialogTrigger asChild>
        <Button className="mt-4">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id={"firstname"}
                value={formData.FIRSTNAME?.value ?? ""}
                onChange={(e) =>
                  handleInputChange(
                    "FIRSTNAME",
                    e.target.value,
                    formData.FIRSTNAME?.id ?? ""
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middlename">Middle Name</Label>
              <Input
                id="middlename"
                value={formData.MIDDLENAME?.value ?? ""}
                onChange={(e) =>
                  handleInputChange(
                    "MIDDLENAME",
                    e.target.value,
                    formData.MIDDLENAME?.id ?? ""
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                value={formData.LASTNAME?.value ?? ""}
                onChange={(e) => {
                  handleInputChange(
                    "LASTNAME",
                    e.target.value,
                    formData.LASTNAME?.id ?? ""
                  );
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tel">Phone Number</Label>
              <Input
                id="tel"
                value={formData.TEL?.value ?? ""}
                onChange={(e) =>
                  handleInputChange(
                    "TEL",
                    e.target.value,
                    formData.TEL?.id ?? ""
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday</Label>
              <Input
                type="date"
                value={dayjs(Number(formData.BIRTHDAY?.value)).format(
                  "YYYY-MM-DD"
                )}
                onChange={(e) => {
                  handleInputChange(
                    "BIRTHDAY",
                    dayjs(e.target.value).valueOf().toString(),
                    formData.BIRTHDAY?.id ?? ""
                  );
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.GENDER?.value ?? "UNKNOWN"}
                onValueChange={(value) =>
                  handleInputChange("GENDER", value, formData.GENDER?.id ?? "")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.COUNTRY?.value ?? "UNKNOWN"}
                onChange={(e) =>
                  handleInputChange(
                    "COUNTRY",
                    e.target.value,
                    formData.COUNTRY?.id ?? ""
                  )
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDisplayForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {(loading && "Loading...") || " Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
