//@ts-nocheck

"use client";

import { create } from "zustand";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import ModelCard from "@/components/explore/card";
import { Input } from "@/components/ui/input";
import AddModel from "@/components/root/AddModel";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/models");

        if (!response.ok) {
          throw new Error("Failed to fetch models");
        }

        const modelsData = await response.json();
        setModels(modelsData);
      } catch (error) {
        console.error("Error fetching models:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
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

      <div className="w-full  flex flex-col items-center justify-center p-4 ">
        <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-10">
          Model Marketplace
        </h1>

        {/* Model navigation */}
        <div className="flex items-center justify-center w-[60%] space-x-6">
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

          <div className="w-1/3 mt-6">
            <AddModel onAddModel={addModel} />
          </div>
        </div>

        <h4 className="font-bold text-left mt-6 text-4xl">Featured Models</h4>
        {/* Featured true models */}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="w-[300px] h-[200px] " />
              </div>
            ))}
          </div>
        ) : (
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
        )}

        <h4 className="font-bold text-left mt-6 text-4xl mb-6">All Models</h4>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="w-[300px] h-[200px] " />
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Page;
