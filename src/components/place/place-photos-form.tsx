"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaceUpdatePhotoInterface } from "../profile/landlord/landlord-place-management";
import { useUpdatePlacePhotos } from "@/hook/place.hook";
// import { useToast } from "@/components/ui/";

// Schema for validation
const photoSchema = z.object({
  photos: z.instanceof(FileList),
});

type PhotoFormData = z.infer<typeof photoSchema>;

interface PhotoUpdateDialogProps {
  updatePhotoInterface: PlaceUpdatePhotoInterface;
  setPhotosInterface: (x: PlaceUpdatePhotoInterface | undefined) => void;
}

export function PhotoUpdateDialog({
  updatePhotoInterface,
  setPhotosInterface,
}: PhotoUpdateDialogProps) {
  const { photos, placeId, placeName, placeAddress } = updatePhotoInterface;
  const [open, setOpen] = useState(photos != undefined);
  const [previews, setPreviews] = useState<string[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [currentPhotos, setCurrentPhotos] = useState<string[]>(photos);
  //   const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PhotoFormData>({
    resolver: zodResolver(photoSchema),
  });
  const { uploadPhotos, uploadPhotoLoading } = useUpdatePlacePhotos();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        setFilesToUpload((prev) => [...prev, ...newFiles]);

        // Create previews
        const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviews]);
      }
    },
    []
  );

  const removePhoto = (index: number, isExisting: boolean) => {
    if (isExisting) {
      //   setPhotosAfterDeletion((prev) => [...prev, photos[index]]);
      setCurrentPhotos((prev) => prev.filter((_, i) => i !== index));
    } else {
      setPreviews((prev) => prev.filter((_, i) => i !== index));
      setFilesToUpload((prev) => prev.filter((_, i) => i !== index));
      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(previews[index]);
    }
  };

  const onSubmit = async () => {
    try {
      await uploadPhotos(
        placeId,
        filesToUpload,
        currentPhotos.length < photos.length ? currentPhotos : []
      );
      //   toast({
      //     title: "Success",
      //     description: "Photos updated successfully",
      //     variant: "default",
      //   });
      resetDialog();
      setPhotosInterface(undefined);
      setOpen(false);
    } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to update photos",
      //     variant: "destructive",
      //   });
    } finally {
    }
  };

  const resetDialog = () => {
    setPreviews([]);
    setFilesToUpload([]);
    setCurrentPhotos([]);
    reset();
    // Revoke all object URLs
    previews.forEach((url) => URL.revokeObjectURL(url));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setPhotosInterface(undefined);
        setOpen(open);
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Update photo for {placeName} - {placeAddress}
          </DialogTitle>
          <DialogDescription>
            Add new photos or remove existing ones. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          {/* Current Photos */}
          {photos.length > 0 && (
            <div>
              <Label>Current Photos</Label>
              <div className="mt-2 grid grid-cols-3 gap-4">
                {currentPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={`/storage/places/${placeId}/${photo}`}
                      alt={placeName + index}
                      className="h-32 w-full object-cover rounded-md"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removePhoto(index, true)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Photos Preview */}
          {previews.length > 0 && (
            <div>
              <Label>New Photos</Label>
              <div className="mt-2 grid grid-cols-3 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="h-32 w-full object-cover rounded-md"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removePhoto(index, false)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* File Upload */}
          <div>
            <Label htmlFor="photos">Add Photos</Label>
            <div className="mt-2 flex items-center gap-4">
              <Label
                htmlFor="photos"
                className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <Plus className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Add photos
                </span>
              </Label>
              <Input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                {...register("photos")}
                onChange={handleFileChange}
              />
              <div className="text-sm text-muted-foreground">
                <p>Upload JPG, PNG (max 5MB each)</p>
                {errors.photos && (
                  <p className="text-destructive">{errors.photos.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetDialog();
              setPhotosInterface(undefined);
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={
              uploadPhotoLoading ||
              (filesToUpload.length === 0 &&
                currentPhotos.length === photos.length)
            }
          >
            {uploadPhotoLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
