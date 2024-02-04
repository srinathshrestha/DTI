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

import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { formSchema } from "@/utils/formSchema";
import { useModelStore } from "@/store/model";

function AddModel() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { addModel } = useModelStore();
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("clicked");
    console.log("data", data);
    setDialogOpen(false);
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

      form.reset();
      addModel(data);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        onClick={() => setDialogOpen(true)}
        className="w-[200px] bg-blue-600 text-white h-[40px] rounded-md font-semibold hover:bg-blue-500"
      >
        Add your own model
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your own model</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <UploadIcon
                control={form.control}
                label="Logo"
                id="logo"
                placeholder="Choose file"
                setValue={form.setValue}
              />
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
                placeholder="GPT4 is a large language model"
              />
              <FormInput
                control={form.control}
                label="Link"
                id="link"
                placeholder="https://chat.openai.com/"
              />
              <FormInput
                control={form.control}
                label="tag"
                id="tag"
                placeholder="Like LLM,text-to-image etc"
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
