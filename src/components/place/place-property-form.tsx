import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { PlaceAttributeName } from "@/lib/contanst";
import {
  PlaceAttribute,
  //   PlaceAttributeCreate,
  //   PlaceAttributeUpdate,
} from "@/lib/data-type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { PlaceUpdateAttributeInterface } from "../profile/landlord/landlord-place-management";

interface AttributeEditorProps {
  data: PlaceUpdateAttributeInterface;
  onAttributesChange: (x: any) => void;
}

export const PlaceAttributeForm = ({
  data,
  onAttributesChange,
}: AttributeEditorProps) => {
  const [newAttribute, setNewAttribute] = useState<{
    name: PlaceAttributeName | null;
    value: string;
    valueNumber: number | null;
  }>({
    name: null,
    value: "",
    valueNumber: 0,
  });

  const { placeName, placeAddress, attributes } = data;
  const [displayForm, setDisplayForm] = useState(true);
  const usedNames = attributes.map((attr) => attr.name);
  const handleAttributeChange = (
    index: number,
    field: keyof PlaceAttribute,
    value: string | number
  ) => {
    const updated = [...attributes];
    if (field === "valueNumber") {
      updated[index] = {
        ...updated[index],
        valueNumber: Number(value),
      };
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
    }
    onAttributesChange(updated);
  };

  const handleAddAttribute = () => {
    if (!newAttribute.name || !newAttribute.value) return;

    const attribute: PlaceAttribute = {
      id: "temp",
      name: newAttribute.name,
      value: newAttribute.value,
      valueNumber: newAttribute.valueNumber,
    };

    if (newAttribute.valueNumber !== undefined) {
      attribute.valueNumber = newAttribute.valueNumber;
    }

    onAttributesChange([...attributes, attribute]);
    setNewAttribute({ name: null, value: "", valueNumber: 0 });
  };

  const handleRemoveAttribute = (index: number) => {
    const updated = attributes.filter((_, i) => i !== index);
    onAttributesChange(updated);
  };

  useEffect(() => {}, [attributes]);

  return (
    <Dialog
      open={displayForm}
      onOpenChange={(open) => {
        setDisplayForm(open);
        onAttributesChange(undefined);
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage: {placeName}</DialogTitle>
          <DialogDescription></DialogDescription>
          <Card>
            <CardHeader>
              <CardTitle>{placeAddress}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[500px] overflow-y-scroll">
              {attributes.map((attr, index) => (
                <div
                  key={`${attr.name}-${index}`}
                  className="flex flex-col sm:flex-row gap-4 items-end p-4 border rounded-lg"
                >
                  <div className="w-full sm:w-1/3">
                    <Label htmlFor={`attr-name-${index}`}>Name</Label>
                    <Select
                      value={attr.name}
                      onValueChange={(value) =>
                        handleAttributeChange(index, "name", value)
                      }
                      disabled
                    >
                      <SelectTrigger id={`attr-name-${index}`}>
                        <SelectValue placeholder="Select attribute" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(PlaceAttributeName).map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full sm:w-1/3">
                    <Label htmlFor={`attr-value-${index}`}>Value</Label>
                    <Input
                      id={`attr-value-${index}`}
                      value={attr.value}
                      onChange={(e) =>
                        handleAttributeChange(index, "value", e.target.value)
                      }
                    />
                  </div>

                  {attr.valueNumber !== undefined && (
                    <div className="w-full sm:w-1/4">
                      <Label htmlFor={`attr-value-number-${index}`}>
                        Numeric Value
                      </Label>
                      <Input
                        id={`attr-value-number-${index}`}
                        type="number"
                        value={attr.valueNumber || 0}
                        onChange={(e) =>
                          handleAttributeChange(
                            index,
                            "valueNumber",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveAttribute(index)}
                    className="mt-2 sm:mt-0"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}

              {/* Add new attribute */}
              <div className="pt-4 mt-4 space-y-4">
                <h4 className="text-md font-medium">Add New Attribute</h4>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="w-full sm:w-1/3">
                    <Label>Name *</Label>
                    <Select
                      value={newAttribute.name || undefined}
                      onValueChange={(value) =>
                        setNewAttribute({
                          ...newAttribute,
                          name: value as PlaceAttributeName,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select attribute" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(PlaceAttributeName)
                          .filter((name) => !usedNames.includes(name))
                          .map((name) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full sm:w-1/3">
                    <Label>Value *</Label>
                    <Input
                      value={newAttribute.value}
                      onChange={(e) =>
                        setNewAttribute({
                          ...newAttribute,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="w-full sm:w-1/4">
                    <Label>Numeric Value</Label>
                    <Input
                      type="number"
                      value={newAttribute.valueNumber || ""}
                      onChange={(e) =>
                        setNewAttribute({
                          ...newAttribute,
                          valueNumber: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                    />
                  </div>

                  <Button
                    onClick={handleAddAttribute}
                    disabled={!newAttribute.name || !newAttribute.value}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>{" "}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
