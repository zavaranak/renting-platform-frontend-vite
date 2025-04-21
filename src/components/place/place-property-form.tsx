import { useState } from "react";
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
  PlaceAttributeCreate,
  PlaceAttributeUpdate,

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
import { usePlaceAttributes } from "@/hook/place.hook";

interface AttributeEditorProps {
  data: PlaceUpdateAttributeInterface;
  setSelectedAttributes: (x: any) => void;
  refreshDashboard: () => void;
}

export const PlaceAttributeForm = ({
  data,
  setSelectedAttributes,
  refreshDashboard,
}: AttributeEditorProps) => {
  //hook
  const {
    createAttrs,
    updateAttrs,
    removeAttrs,
    // statusCreate,
    // statusUpdate,
    // statusRemove,
  } = usePlaceAttributes();

  const [newAttribute, setNewAttribute] = useState<PlaceAttributeCreate>({
    name: PlaceAttributeName.UNSELECTED,
    value: "",
    valueNumber: 0,
  });
  const { placeName, placeAddress, attributes, placeId } = data;
  const [tempAttributes, setTempAttributes] =
    useState<PlaceAttribute[]>(attributes);
  const [newAttributes, setNewAttributes] = useState<PlaceAttribute[]>([]);
  const [removedAttributes, setRemovedAttributes] = useState<string[]>([]);
  const [displayForm, setDisplayForm] = useState(true);
  const [usedNames, setUsedNames] = useState<PlaceAttributeName[]>(
    tempAttributes.length > 0 ? tempAttributes.map((attr) => attr.name) : []
  );

  const getUpdates = (): PlaceAttributeUpdate[] => {
    const updates: PlaceAttributeUpdate[] = [];
    attributes.forEach((attr) => {
      const peer = tempAttributes.find((temp) => temp.id == attr.id);
      if (peer) {
        if (peer.value != attr.value || peer.valueNumber != attr.valueNumber) {
          const { value, valueNumber, id } = peer;
          updates.push({ value, valueNumber, id } as PlaceAttributeUpdate);
        }
      }
    });
    return updates;
  };
  const handleAttributeChange = (
    index: number,
    field: keyof PlaceAttribute,
    value: string | number,
    type: "existed" | "new"
  ) => {
    const handleChange = (updated: PlaceAttribute[]) => {
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
      setTempAttributes(updated);
    };

    switch (type) {
      case "existed": {
        const updated = [...tempAttributes];
        handleChange(updated);
        break;
      }
      case "new": {
        const updated = [...newAttributes];
        handleChange(updated);
        break;
      }
    }
  };

  const handleAddAttribute = () => {
    if (!newAttribute.name || !newAttribute.value) return;
    if (newAttribute.name === PlaceAttributeName.UNSELECTED) return;
    const attribute: PlaceAttribute = {
      id: "temp" + newAttribute.name.toString(),
      name: newAttribute.name,
      value: newAttribute.value,
      valueNumber: newAttribute.valueNumber,
    };

    if (newAttribute.valueNumber !== undefined) {
      attribute.valueNumber = newAttribute.valueNumber;
    }

    setUsedNames((prev) => [...prev, attribute.name]);
    setNewAttributes((prev) => [...prev, attribute]);
    setNewAttribute({
      name: PlaceAttributeName.UNSELECTED,
      value: "",
      valueNumber: 0,
    });
  };

  const handleRemoveAttribute = (id: string, type: "existed" | "new") => {
    switch (type) {
      case "existed": {
        setRemovedAttributes((prev) => [...prev, id]);
        const updated = tempAttributes.filter((attr) => attr.id !== id);
        setTempAttributes(updated);
        break;
      }
      case "new": {
        const updated = newAttributes.filter((attr) => attr.id !== id);
        setNewAttributes(updated);
        break;
      }
    }
  };

  const handleSave = async () => {
    const promiseCreate = new Promise((res, _) => {
      if (newAttributes.length > 0) {
        const creates: PlaceAttributeCreate[] = newAttributes.map(
          (x: PlaceAttribute) => ({
            name: x.name,
            value: x.value,
            valueNumber: x.valueNumber,
          })
        );
        res(createAttrs(creates, placeId));
      }
      res(true);
    });
    const promiseUpdate = new Promise((res, _) => {
      const updates = getUpdates();
      if (updates.length > 0) {
        res(updateAttrs(updates));
      }
      res(true);
    });
    const promiseRemove = new Promise((res) => {
      if (removedAttributes.length > 0) {
        res(removeAttrs(removedAttributes));
      }
      res(true);
    });
    await Promise.all([promiseCreate, promiseUpdate, promiseRemove]).then(
      () => {
        setSelectedAttributes(undefined);
        refreshDashboard();
      }
    );
  };

  return (
    <Dialog
      open={displayForm}
      onOpenChange={(open) => {
        setDisplayForm(open);
        setSelectedAttributes(undefined);
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
            <CardContent className="space-y-4 max-h-[500px] overflow-y-hidden">
              <div className="rounded-lg max-h-[300px] overflow-y-scroll">
                {tempAttributes.map((attr: PlaceAttribute, index: number) => (
                  <AttributeRow
                    key={index + "existed-attribute"}
                    type="existed"
                    index={index}
                    attr={attr}
                    handleRowChange={handleAttributeChange}
                    handleRowDelete={handleRemoveAttribute}
                  />
                ))}
                {newAttributes.map((attr: PlaceAttribute, index: number) => (
                  <AttributeRow
                    key={index + "new-attribute"}
                    type="new"
                    index={index}
                    attr={attr}
                    handleRowChange={handleAttributeChange}
                    handleRowDelete={handleRemoveAttribute}
                  />
                ))}
              </div>

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
                      disabled={
                        newAttribute.name == PlaceAttributeName.UNSELECTED
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
                      disabled={
                        newAttribute.name == PlaceAttributeName.UNSELECTED
                      }
                    />
                  </div>

                  <Button
                    onClick={handleAddAttribute}
                    disabled={
                      !newAttribute.name ||
                      newAttribute.name == PlaceAttributeName.UNSELECTED ||
                      !newAttribute.value
                    }
                    className="w-full sm:w-auto"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>{" "}
          <div className="m-auto flex gap-2">
            <Button
              className="w-24"
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </Button>
            <Button
              className="w-24"
              onClick={() => {
                setDisplayForm(false);
                setSelectedAttributes(undefined);
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

interface AttributeRowParams {
  index: number;
  attr: PlaceAttribute;
  handleRowChange: (
    index: number,
    key: keyof PlaceAttribute,
    value: string | number,
    type: "existed" | "new"
  ) => void;
  handleRowDelete: (id: string, type: "existed" | "new") => void;
  type: "existed" | "new";
}

const AttributeRow = ({
  index,
  attr,
  handleRowChange,
  handleRowDelete,
  type,
}: AttributeRowParams) => {
  // const [value,setValue] = useState(attr.value)
  // const [valueNumber,setValueNumber] = useState(attr.valueNumber)

  return (
    <div
      key={`${attr.name}-${index}-${type}`}
      className="flex flex-col sm:flex-row gap-4 items-end p-4 border rounded-lg"
    >
      <div className="w-full sm:w-1/3">
        <Label htmlFor={`attr-name-${index}`}>Name</Label>
        <Select
          value={attr.name}
          onValueChange={(value) => handleRowChange(index, "name", value, type)}
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
            handleRowChange(index, "value", e.target.value, type)
          }
        />
      </div>

      {attr.valueNumber !== undefined && (
        <div className="w-full sm:w-1/4">
          <Label htmlFor={`attr-value-number-${index}`}>Numeric Value</Label>
          <Input
            id={`attr-value-number-${index}`}
            type="number"
            value={attr.valueNumber || 0}
            onChange={(e) =>
              handleRowChange(index, "valueNumber", e.target.value, type)
            }
          />
        </div>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handleRowDelete(attr.id, type)}
        className="mt-2 sm:mt-0"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
};
