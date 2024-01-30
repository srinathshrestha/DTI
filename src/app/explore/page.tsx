import ModelCard from "@/components/explore/card";
import { Input } from "@/components/ui/input";

function page() {
  return (
    <div className="m-2">
      <h1 className="text-4xl font-bold text-center mt-10">Model MarketPlace</h1>
      <div className="m-2">
        <h4 className="font-bold">Model Name</h4>
        <Input type="email" placeholder="Like GPT 4"/>
      </div>
      <div className="">

        <h4 className="font-bold">Featured Models</h4>
        <ModelCard />
      </div>
    </div>
  );
}

export default page;
