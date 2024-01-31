"use client";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFormContext } from "react-hook-form";
import { useFormStore } from "@/strore/form";
import { Image } from "lucide-react";

export default function UploadIcon() {
  const { register, setValue } = useFormContext();
  const inputFileRef = useRef<HTMLInputElement>(null);
  //   const [blob, setBlob] = useState<PutBlobResult | null>(null);
  //   const [uploading, setUploading] = useState(false);

  const { blob, uploading, setBlob, setUploading } = useFormStore();
  const handleFileChange = async (event: any) => {
    event.preventDefault();
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }
    const file = inputFileRef.current.files[0];
    try {
      setUploading(true);
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });
      if (!response.ok) {
        throw new Error("File upload failed");
      }
      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);
      setValue("logo", newBlob?.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label className="font-bold text-black" >Logo</Label>
      <div className="flex gap-2 items-center mt-2">
        {blob ? (
          <div>
            <Avatar>
              <AvatarImage src={blob.url} alt="Uploaded Avatar" height={5} width={5} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Image />
        )}
        <div>
          <Input
            {...register("logo")}
            id="picture"
            type="file"
            ref={inputFileRef}
            required
            onChange={handleFileChange}
          />
          {uploading && <p>Uploading...</p>}
        </div>
      </div>
    </div>
  );
}
