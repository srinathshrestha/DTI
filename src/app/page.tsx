/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
"use client";
import create from "zustand";
import ModelCard from "@/components/explore/card";
import { Input } from "@/components/ui/input";
import AddModel from "@/components/root/AddModel";
import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";



export const useModelStore = create((set) => ({
  models: [],
  allModels: [],
  searchQuery: "",
  setModels: (models) => set({ models, allModels: models }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addModel: (newModel) =>
    set((state) => ({
      models: [...state.models, newModel],
      allModels: [...state.allModels, newModel],
    })),
}));

function Page() {
  const { models, setModels, addModel, searchQuery, setSearchQuery } =
    useModelStore();

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

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };
const featuredModels = models.filter((model) => model.featured);
  return (
    <div>
      <Navbar />

      <div className="w-full flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-screen-lg flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-bold text-center mt-20">
            Model Marketplace
          </h1>
          <div className="flex items-start w-full space-x-4">
            <div className="w-2/3">
              <h4 className="font-bold">Model Name</h4>
              <Input
                type="text"
                placeholder="Like GPT 4"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>
            <div className="w-1/3">
              <AddModel onAddModel={addModel} />
            </div>
          </div>
          <h4 className="font-bold text-left mt-4">Featured Models</h4>
          {/*featured true models*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuredModels.map((model, index) => (
              <div key={index}>
                <Link href={`/model/${model.id}`}>
                  <ModelCard
                    modelName={model.name}
                    description={model.description}
                    logo={model.logo}
                  />
                </Link>
              </div>
            ))}
          </div>
          <h4>All Models</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {models
              .filter((model) =>
                model.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((model, index) => (
                <div key={index}>
                  <Link href={`/model/${model.id}`}>
                    <ModelCard
                      modelName={model.name}
                      description={model.description}
                      logo={model.logo}
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
