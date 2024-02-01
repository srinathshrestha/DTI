/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
"use client";
import create from "zustand";
import ModelCard from "@/components/explore/card";
import { Input } from "@/components/ui/input";
import AddModel from "@/components/root/AddModel";
import { useEffect } from "react";

export const useModelStore = create((set) => ({
  models: [],
  setModels: (models) => set({ models }),
  addModel: (newModel) =>
    set((state) => ({ models: [...state.models, newModel] })),
}));

function Page() {
  const { models, setModels, addModel } = useModelStore();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/models");

        if (!response.ok) {
          throw new Error("Failed to fetch models");
        }

        const modelsData = await response.json();
        setModels(modelsData);
      } catch (error) {
        console.error("Error fetching models:", error.message);
      }
    };

    fetchModels();
  }, [setModels]);

  return (
    <div className="m-2">
      <h1 className="text-4xl font-bold text-center mt-10">
        Model MarketPlace
      </h1>
      <div className="m-2">
        <h4 className="font-bold">Model Name</h4>
        <Input type="email" placeholder="Like GPT 4" />
      </div>
      <div className="">
        <h4 className="font-bold">Featured Models</h4>

        <div className="flex flex-wrap gap-4">
          {models.map((model, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
            >
              <ModelCard
                modelName={model.name}
                description={model.description}
                logo={model.logo}
              />
            </div>
          ))}
        </div>
      </div>
      <AddModel onAddModel={addModel} />
    </div>
  );
}

export default Page;
