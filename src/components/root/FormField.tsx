// FormField.jsx
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const FormField = ({ label, id, placeholder, register, required }:any) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label>{label}</Label>
    <Input
      type="text"
      id={id}
      placeholder={placeholder}
      {...register(id, { required })}
    />
  </div>
);

export default FormField;
