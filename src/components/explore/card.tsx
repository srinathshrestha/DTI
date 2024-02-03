import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
interface TModelCardProps {
  name: string;
  description: string;
  logo: string;
  tag: string | null;
}

function ModelCard({ name, description, logo, tag }: TModelCardProps) {
  console.log("tag", tag);
  return (
    <div>
      <Card className="h-52 w-80 hover:bg-gray-50">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <Avatar>
              <AvatarImage src={logo} className="object-contain" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
          </CardTitle>
          <CardDescription className="space-x-2 flex gap-2 truncate">
            {name}

            <Badge className="bg-emerald-400"> {tag}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="truncate">{description}</p>
        </CardContent>
        <CardFooter>
          <p className="flex gap-2 pb-4">
            Explore <ArrowRight />
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ModelCard;
