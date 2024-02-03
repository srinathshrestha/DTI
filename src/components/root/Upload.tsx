"use client";
import type { PutBlobResult } from "@vercel/blob";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFormStore } from "@/strore/form";
import { Image } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Progress } from "@/components/ui/progress";

interface UploadIcon {
  label: string;
  id: string;
  placeholder: string;
  control: any;
  setValue: any;
}

export default function UploadIcon({
  control,
  id,
  label,
  placeholder,
  setValue,
}: UploadIcon) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { blob, uploading, setBlob, setUploading } = useFormStore();
  const [progress, setProgress] = useState<number>(0);
  const handleFileChange = async (event: any) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }
    const file = inputFileRef.current.files[0];
    try {
      setUploading(true);
      setProgress(30);
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });
      setProgress(50);
      if (!response.ok) {
        throw new Error("File upload failed");
      }
      const newBlob = (await response.json()) as PutBlobResult;
      setProgress(80);
      setBlob(newBlob);
      setValue("logo", newBlob?.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setProgress(100);
      setUploading(false);
    }
  };

  return (
    <div>
      <Label>Logo</Label>
      <div className="flex gap-2 items-center mt-2 mb-4 w-ful">
        {blob ? (
          <div>
            <Avatar>
              <AvatarImage
                src={blob.url}
                alt="Uploaded Avatar"
                height={5}
                width={5}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Image />
        )}
        <div>
          <FormField
            control={control}
            name={id}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id={id}
                    type="file"
                    ref={inputFileRef}
                    onChange={handleFileChange}
                    className="h-10 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {uploading && <Progress value={progress} className="mt-2"/>}
        </div>
      </div>
    </div>
  );
}
