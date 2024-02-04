"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import ModelCard from "@/components/explore/card";
import { Input } from "@/components/ui/input";
import AddModel from "@/components/root/AddModel";
import Footer from "@/components/Footer";
import { useModelStore } from "@/store/model";

function Page() {
  const { models, setModels, searchQuery, setSearchQuery } = useModelStore();

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
      } catch (e: any) {
        console.error("Error fetching models:", e.message);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchModels();
  }, [setModels]);

  const handleSearchChange = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const featuredModels = models.filter((model) => model.featured);
  console.log("models", models);
  console.log("Featured", featuredModels);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
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
              <AddModel />
            </div>
          </div>

          <h4 className="font-bold text-left mt-6 text-4xl mb-6">
            Featured Models
          </h4>
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
                      name={model.name}
                      description={model.description}
                      logo={model.logo}
                      tag={model.tag}
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
                        name={model.name}
                        description={model.description}
                        logo={model.logo}
                        tag={model.tag}
                      />
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Page;
