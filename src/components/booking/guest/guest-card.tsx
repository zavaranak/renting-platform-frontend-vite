import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Guest } from "@/lib/data-type";

type Props = {
  guest: Guest;
  onEdit: () => void;
  onDelete: () => void;
};

export const GuestCard: React.FC<Props> = ({ guest, onEdit, onDelete }) => {
  return (
    <Card className="pl-2">
      <CardHeader className="p-1 pl-0">
        <CardTitle className="text-lg">
          {guest.lastName} {guest.firstName} {guest.middleName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between p-0">
        <div className="text-sm text-muted-foreground">
          {guest.email || "No email"} <br />
          {guest.tel || "No phone"}
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={onEdit}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete}>
            <Trash className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
