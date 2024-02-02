"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import UploadIcon from "./Upload";
import { FormTextArea, FormInput } from "./FormField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModelStore } from "@/app/page";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
function AddModel() {
  const formSchema = z.object({
    name: z.string().min(2).max(10),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  //@ts-ignore
  const { addModel } = useModelStore();
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("clicked");
    console.log("data", data);
    try {
      const response = await fetch("/api/models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setDialogOpen(false);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      form.reset();
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* <UploadIcon /> */}
              <FormInput
                control={form.control}
                label="Model Name"
                id="name"
                placeholder="Like GPT4"
              />
              <FormInput
                control={form.control}
                label="Description"
                id="description"
                placeholder="Like GPT4"
              />
              <FormInput
                control={form.control}
                label="Link"
                id="link"
                placeholder="Like GPT4"
              />
              <FormTextArea
                control={form.control}
                id="applications"
                placeholder="Like GPT4"
                label="Applications"
              />
              <FormTextArea
                control={form.control}
                label="Usage"
                id="usage"
                placeholder="Usage"
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddModel;
