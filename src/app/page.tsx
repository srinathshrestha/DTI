import ModelCard from "@/components/explore/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AvatarUploadPage from "@/components/root/Upload";
import AddModel from "@/components/root/AddModel";

function page() {
  return (
    <div className="m-2">
      <h1 className="text-4xl font-bold text-center mt-10">
        Model MarketPlace
      </h1>
      <div className="m-2">
        <h4 className="font-bold">Model Name</h4>
        <Input type="email" placeholder="Like GPT 4" />
      </div>
      <div className="">
        <h4 className="font-bold">Featured Models</h4>
        <ModelCard />
      </div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
            <AddModel/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default page;
