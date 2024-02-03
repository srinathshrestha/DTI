"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="w-full h-screen flex flex-col justify-center items-center ">
        <h2 className="text-4xl mb-6 font-bold">Something went wrong!</h2>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
