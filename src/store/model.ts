import { create } from "zustand";
import { TModel } from "@/types/types";

interface TModelStore {
  models: TModel[];
  searchQuery: string;
}

interface TModelStoreActions {
  setModels: (models: TModel[]) => void;
  setSearchQuery: (query: string) => void;
  addModel: (newModel: TModel) => void;
}

export const useModelStore = create<TModelStore & TModelStoreActions>()(
  (set) => ({
    models: [],
    searchQuery: "",
    setModels: (models: TModel[]) => set({ models }),
    setSearchQuery: (query: string) => set({ searchQuery: query }),
    addModel: (newModel: TModel) =>
      set((state) => ({
        models: [...state.models, newModel],
      })),
  })
);
