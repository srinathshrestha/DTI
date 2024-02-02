import { z } from "zod";


export const formSchema = z.object({
  name: z.string().min(2).max(10),
  logo: z.string(),
  description: z.string().min(10).max(1000),
  applications: z.string().min(10).max(1000),
  link: z.string(),
  usage: z.string().min(10).max(1000),
  tag: z.string().min(2).max(10),
});