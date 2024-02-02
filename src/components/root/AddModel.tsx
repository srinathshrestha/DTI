//@ts-nocheck
"use client";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import UploadIcon from "./Upload";
import { FormTextArea, FormInput } from "./FormField";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useModelStore } from "@/app/page";
import { Button } from "../ui/button";

function AddModel() {
  const methods = useForm();
  const { addModel } = useModelStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = methods;
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("data", data);
    try {
      const response = await fetch("/api/models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response from server:", responseData);
      setDialogOpen(false);

      // Optionally, reset the form fields
      reset();
      await addModel(data);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger onClick={() => setDialogOpen(true)}>Open</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your own model</DialogTitle>

          <DialogDescription>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <UploadIcon />
                <FormInput
                  label="Model Name"
                  id="name"
                  placeholder="Like GPT4"
                  register={register}
                  required
                />
                <FormInput
                  label="Description"
                  id="description"
                  placeholder="Like GPT4"
                  register={register}
                  required
                />
                <FormInput
                  label="Link"
                  id="link"
                  placeholder="Like GPT4"
                  register={register}
                  required
                />
                <FormTextArea
                  label="Application"
                  id="applications"
                  placeholder="Like GPT4"
                  register={register}
                  required
                />
                <FormTextArea
                  label="Usage"
                  id="usage"
                  placeholder="Like GPT4"
                  register={register}
                  required
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </FormProvider>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddModel;
