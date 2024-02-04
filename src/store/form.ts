import { PutBlobResult } from "@vercel/blob";
import { create } from "zustand";

interface FormStore {
 blob: PutBlobResult | null;
  uploading: boolean;
  
}
interface FormStoreActions {
  setBlob: (newBlob: PutBlobResult) => void;
  setUploading: (uploading: boolean) => void;
}

export const useFormStore= create<FormStore & FormStoreActions>()((set) => ({
  blob: null,
  uploading: false,
  inputFileRef: null,
  setBlob: (newBlob) => set({ blob: newBlob }),
  setUploading: (uploading) => set({ uploading }),
}));
