"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

function ModelDetail({ params }: { params: { slug: string } }) {
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
              <span className="ml-2 text-lg font-semibold">HEX</span>
            </Link>
          </header>
        </div>
        <section className="py-12 px-4 flex flex-col items-center">
          <Avatar>
            <AvatarImage src={model.logo} height={20} width={20} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-3xl font-bold">{model.name}</h2>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
            Try it out
          </Button>
          <p className="mt-4 text-gray-600">
            Our product offers a wide range of features designed to help you
            succeed. From seamless integration to powerful analytics, we have
            got you covered.
          </p>
        </section>
        <section className="py-12 px-4 bg-gray-100">
          <h2 className="text-3xl font-bold">Application</h2>
          <p className="mt-4 text-gray-600">
            Our product can be used in a variety of ways to help you achieve
            your goals. Whether you are a small business owner or a large
            corporation, our product can be tailored to your needs.
          </p>
        </section>
        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold">Usage</h2>
          <p className="mt-4 text-gray-600">
            Getting started with our product is easy. Simply sign up for an
            account, customize your settings, and you are ready to go. If you
            need any help along the way, our support team is always here to
            assist you.
          </p>
        </section>
      </main>
      <footer className="h-16 flex items-center justify-center bg-gray-800 text-white">
        <p>© 2024 Acme Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ModelDetail;
