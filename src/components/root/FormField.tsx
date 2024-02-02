import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const FormInput = ({ label, id, placeholder, register, required }: any) => (
  <div className="grid w-full  items-center gap-1.5 mb-4 ">
    <Label>{label}</Label>
    <Input
      type="text"
      id={id}
      placeholder={placeholder}
      {...register(id, { required })}
    />
  </div>
);

const FormTextArea = ({ label, id, placeholder, register, required }: any) => (
  <div className="grid w-full  items-center gap-1.5 mb-4">
    <Label>{label}</Label>

    <Textarea
      id={id}
      placeholder={placeholder}
      {...register(id, { required })}
    />
  </div>
);
// export default FormInput;
export { FormTextArea, FormInput };
