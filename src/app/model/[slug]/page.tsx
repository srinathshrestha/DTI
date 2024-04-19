"use client";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useEffect, useState } from "react";



function ModelDetailPage({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch(`/api/models?id=${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch model");
        }

        const modelData = await response.json();
        console.log(modelData);
        setModel(modelData);
      } catch (error: any) {
        console.error("Error fetching model:", error.message);
      }
    };

    if (id) {
      fetchModel();
    }
  }, [id]);

  if (!model) {
    return <p>Loading...</p>;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="flex flex-col mb-8">
          <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-white shadow-md">
            <Link className="flex items-center" href="/">
              {/* <MountainIcon className="h-6 w-6" /> */}
              <span className="ml-2 text-lg font-semibold">ModelHuB</span>
            </Link>
          </header>
        </div>
        <section className="py-12 px-4 flex flex-col items-center">
          <Avatar>
            <AvatarImage src={model.logo} height={100} width={100} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-3xl font-bold">{model.name}</h2>
          <a href={"https://"+model.link}>
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
              Try it out
            </Button>
          </a>
      
          <p className="mt-4 text-gray-600">{model.description}</p>
        </section>
        <section className="py-12 px-4 bg-gray-100">
          <h2 className="text-3xl font-bold">Application</h2>
          <p className="mt-4 text-gray-600">{model.applications}</p>
        </section>
        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold">Usage</h2>
          <p className="mt-4 text-gray-600">{model.usage}</p>
        </section>
      </main>
    <Footer/>
    </div>
  );
}

export default ModelDetailPage;
