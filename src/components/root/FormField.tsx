import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
interface TFieldProps {
  label: string;
  id: string;
  placeholder: string;
  control: any;
}

function FormInput({ label, id, placeholder, control }: TFieldProps) {
  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="text"
              id={id}
              placeholder={placeholder}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
function FormTextArea({ label, id, placeholder, control }: TFieldProps) {
  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              id={id}
              placeholder={placeholder}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormInput, FormTextArea };
