import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

import Image from "next/image";

function ModelCard() {
  return (
    <div>
      <Card className="h-48 w-80 hover:bg-gray-50">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <Image
              src="/logo/openai.png"
              height={20}
              width={20}
              alt="openai logo"
            />
            GPT 4
          </CardTitle>
          <CardDescription>by Open Ai</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p className="flex gap-2">
            Explore
            <ArrowRight />
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ModelCard;
