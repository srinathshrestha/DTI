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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function ModelCard({ name, description, logo }:any) {
  return (
    <div>
      <Card className="h-48 w-80 hover:bg-gray-50">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <Avatar>
              <AvatarImage src={logo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {name}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p className="flex gap-2">
            Explore <ArrowRight />
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ModelCard;
